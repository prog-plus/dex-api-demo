import RaydiumDex from '../exchanges/raydium.js';

export default async function getDexService(wallet) {
  if (!wallet) {
    throw new Error('Platform wallet not found');
  }

  const { DEX_TYPE } = process.env;

  switch (DEX_TYPE) {
    case 'raydium':
      return new RaydiumDex(wallet);

    default:
      throw new Error('Invalid DEX type');
  }
}
