export default async function finishTransaction(transaction, payload, db_options) {
  Object.assign(transaction, payload);

  await transaction.save(db_options);

  return transaction;
}
