import { Keypair } from '@solana/web3.js';
import bs58 from 'bs58';

export default function getWallet() {
  return Keypair.fromSecretKey(
    bs58.decode(process.env.SOLANA_PRIVATE_KEY),
  );
}
