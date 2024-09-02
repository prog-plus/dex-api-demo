import TRANSACTION_STATUS_ENUM from '../enums/transactionStatus.js';
import Transaction from '../models/transaction.js';

export default async function startTransaction(payload, db_options) {
  payload.status = TRANSACTION_STATUS_ENUM.pending;

  return Transaction.create(payload, db_options);
}
