import PlatformBalance from '../models/platformBalance.js';

export default async function getPlatformBalance() {
  return PlatformBalance.findOne({
    order: [['last_updated', 'DESC']],
  });
}
