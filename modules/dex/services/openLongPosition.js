import sequelize from '../../../db/index.js';
import getAssetById from '../../asset/services/getAssetById.js';
import getClientById from '../../client/services/getClientById.js';
import updateClientBalance from '../../client/services/updateClientBalance.js';
import getPlatformBalance from '../../platform/services/getPlatformBalance.js';
import updatePlatformBalance from '../../platform/services/updatePlatformBalance.js';
import TRANSACTION_STATUS_ENUM from '../../transaction/enums/transactionStatus.js';
import TRANSACTION_TYPE_ENUM from '../../transaction/enums/transactionType.js';
import finishTransaction from '../../transaction/services/finishTransaction.js';
import startTransaction from '../../transaction/services/startTransaction.js';
import getWallet from '../../wallet/services/getWallet.js';

import POSITION_TYPE_ENUM from '../enums/positionType.js';
import getDexService from './getDexService.js';
import openPositionOnDex from './openPositionOnDex.js';

export default async function openLongPosition(user_id, asset_id, amount_token) {
  const db_transaction = await sequelize.transaction();
  const db_options = { transaction: db_transaction };

  try {
    // Retrieve and validate asset
    const asset = await getAssetById(asset_id);

    if (!asset) {
      throw new Error('Asset not found');
    }

    // Retrieve and validate client
    const client = await getClientById(user_id);

    if (!client) {
      throw new Error('Client not found');
    }

    // Prepare DEX service
    const wallet = getWallet();
    const DexService = await getDexService(wallet);

    // Calculate amount of SOL to send
    const { SOL_TOKEN_ADDRESS, USDT_TOKEN_ADDRESS } = process.env;
    const prices = await DexService.getMintPrices([SOL_TOKEN_ADDRESS, USDT_TOKEN_ADDRESS]);
    const token_to_sol = prices[SOL_TOKEN_ADDRESS] / prices[USDT_TOKEN_ADDRESS];
    const sol_to_send = amount_token * token_to_sol;

    if (client.balance_sol < sol_to_send) {
      throw new Error('Insufficient balance');
    }

    // Start transaction
    const updated_at = new Date();
    const transaction = await startTransaction(
      {
        date: updated_at,
        transaction_type: TRANSACTION_TYPE_ENUM.open_position,
        position_type: POSITION_TYPE_ENUM.long,
        user_id,
        asset_id,
        amount_token,
        amount_sol: sol_to_send,
      },
      db_options,
    );

    // Data to update client and platform balance
    const balance_update = {
      delta: {
        balance_tokens: amount_token,
        balance_sol: -(sol_to_send),
      },
      updated_at,
    };

    // Update client balance
    await updateClientBalance(client, balance_update, db_options);

    // Interact with DEX to buy tokens
    const { contract_address } = asset;
    const dex_transaction_id = await openPositionOnDex(wallet, amount_token, contract_address, POSITION_TYPE_ENUM.long);

    // Update platform balance
    const platform_balance = await getPlatformBalance();
    const new_platform_balance = await updatePlatformBalance(platform_balance, balance_update, db_options);
    const platform_balance_before = platform_balance.balance_sol;
    const platform_balance_after = new_platform_balance.balance_sol;

    // Finish transaction
    const transaction_update = {
      dex_transaction_id,
      date: new Date(),
      status: TRANSACTION_STATUS_ENUM.successful,
      platform_balance_before,
      platform_balance_after,
    };
    await finishTransaction(transaction, transaction_update, db_options);

    // Save all DB changes
    await db_transaction.commit();

    // Success
    return true;
  } catch (error) {
    // Rollback all DB changes
    await db_transaction.rollback();

    throw error;
  }
}
