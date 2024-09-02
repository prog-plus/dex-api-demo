import performDexTransaction from './performDexTransaction.js';

export default async function openLongPositionOnDex(wallet, amount, contractAddress, side) {
  return performDexTransaction(wallet, amount, contractAddress, side);
}
