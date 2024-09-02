import getDexService from './getDexService.js';

export default async function performDexTransaction(wallet, amount, contractAddress, side) {
  const DexService = await getDexService(wallet);

  return DexService.performTransaction(amount, contractAddress, side);
}
