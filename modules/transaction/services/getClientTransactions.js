import Transaction from '../models/transaction.js';

export default async function getClientTransactions(client, asset) {
  return Transaction.findAll({
    where: {
      user_id: client.client_id,
      ...asset
        ? { asset_id: asset.asset_id }
        : {},
    },
    order: [['date', 'ASC']],
  });
}
