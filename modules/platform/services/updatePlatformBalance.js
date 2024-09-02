import PlatformBalance from '../models/platformBalance.js';

export default async function updatePlatformBalance(platformBalance, payload, db_options) {
  const { delta, updated_at } = payload;

  return await PlatformBalance.create(
    {
      balance_sol: platformBalance.balance_sol + delta.balance_sol,
      balance_tokens: platformBalance.balance_tokens + delta.balance_tokens,
      last_updated: updated_at,
    },
    db_options
  );
}
