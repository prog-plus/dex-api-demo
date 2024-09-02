export default async function updateClientBalance(client, payload, db_options) {
  const { delta, updated_at } = payload;
  const { balance_tokens, balance_sol } = delta;

  client.balance_tokens += balance_tokens;
  client.balance_sol += balance_sol;
  client.last_updated = updated_at;

  await client.save(db_options);
}
