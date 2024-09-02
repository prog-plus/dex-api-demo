import sequelize from 'db/index.js';
import getAssetById from '../../../asset/services/getAssetById.js';
import getClientById from '../../../client/services/getClientById.js';
import updateClientBalance from '../../../client/services/updateClientBalance.js';
import getDexService from '../../../dex/services/getDexService.js';
import openLongPosition from '../../../dex/services/openLongPosition.js';
import openPositionOnDex from '../../../dex/services/openPositionOnDex.js';
import getPlatformBalance from '../../../platform/services/getPlatformBalance.js';
import updatePlatformBalance from '../../../platform/services/updatePlatformBalance.js';
import finishTransaction from '../../../transaction/services/finishTransaction.js';
import startTransaction from '../../../transaction/services/startTransaction.js';
import getWallet from '../../../wallet/services/getWallet.js';

jest.mock('db/index.js');
jest.mock('../../../asset/services/getAssetById.js');
jest.mock('../../../client/services/getClientById.js');
jest.mock('../../../client/services/updateClientBalance.js');
jest.mock('../../../dex/services/getDexService.js');
jest.mock('../../../dex/services/openPositionOnDex.js');
jest.mock('../../../platform/services/getPlatformBalance.js');
jest.mock('../../../platform/services/updatePlatformBalance.js');
jest.mock('../../../transaction/services/finishTransaction.js');
jest.mock('../../../transaction/services/startTransaction.js');
jest.mock('../../../wallet/services/getWallet.js');

describe('openLongPosition service', () => {
  let mockTransaction;

  beforeEach(() => {
    mockTransaction = {
      commit: jest.fn(),
      rollback: jest.fn(),
    };
    sequelize.transaction.mockResolvedValue(mockTransaction);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should open a long position successfully', async () => {
    const user_id = '466474c8-c402-40d3-a479-197b255f0b53';
    const asset_id = '97b300c5-01f6-4e4c-9f89-3aa99c204249';
    const amount_token = 50;
    const asset = { contract_address: 'DVa7Qmb5ct9RCpaU7UTpSaf3GVMYz17vNVU67XpdCRut' };
    const client = { balance_sol: 50000, balance_tokens: 0 };
    const wallet = {};
    const DexService = {
      getMintPrices: jest.fn().mockResolvedValue({
        [process.env.SOL_TOKEN_ADDRESS]: 1,
        [process.env.USDT_TOKEN_ADDRESS]: 1,
      }),
    };

    getAssetById.mockResolvedValue(asset);
    getClientById.mockResolvedValue(client);
    getWallet.mockReturnValue(wallet);
    getDexService.mockResolvedValue(DexService);
    startTransaction.mockResolvedValue({});
    updateClientBalance.mockResolvedValue({});
    openPositionOnDex.mockResolvedValue('dex_transaction_id');
    getPlatformBalance.mockResolvedValue({ balance_sol: 550000 });
    updatePlatformBalance.mockResolvedValue({ balance_sol: 550000 });
    finishTransaction.mockResolvedValue({});

    const result = await openLongPosition(user_id, asset_id, amount_token);

    expect(result).toBe(true);
    expect(mockTransaction.commit).toHaveBeenCalled();
  });

  it('should throw an error if asset is not found', async () => {
    getAssetById.mockResolvedValue(null);

    await expect(openLongPosition(
      '466474c8-c402-40d3-a479-197b255f0b53',
      'a992d7e5-6384-4287-ab72-cce7614bd035',
      50)
    ).rejects.toThrow('Asset not found');

    expect(mockTransaction.rollback).toHaveBeenCalled();
  });

  it('should throw an error if client is not found', async () => {
    getAssetById.mockResolvedValue({});
    getClientById.mockResolvedValue(null);

    await expect(openLongPosition('1', '1', 50)).rejects.toThrow('Client not found');
    expect(mockTransaction.rollback).toHaveBeenCalled();
  });

  it('should throw an error if client has insufficient balance', async () => {
    const asset = { contract_address: '0xAsset' };
    const client = { balance_sol: 1 };
    const wallet = {};
    const DexService = {
      getMintPrices: jest.fn().mockResolvedValue({
        [process.env.SOL_TOKEN_ADDRESS]: 1,
        [process.env.USDT_TOKEN_ADDRESS]: 1,
      }),
    };

    getAssetById.mockResolvedValue(asset);
    getClientById.mockResolvedValue(client);
    getWallet.mockReturnValue(wallet);
    getDexService.mockResolvedValue(DexService);

    await expect(openLongPosition('1', '1', 50)).rejects.toThrow('Insufficient balance');
    expect(mockTransaction.rollback).toHaveBeenCalled();
  });
});
