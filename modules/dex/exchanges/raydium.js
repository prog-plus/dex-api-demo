import DexAdapter from '../adapter/index.js';

export default class RaydiumDex extends DexAdapter {
  constructor(platform_wallet) {
    super();
    this.platform_wallet = platform_wallet;
  }

  async getMintPrices(mints) {
    const endpoint = 'https://api-v3.raydium.io/mint/price';
    const url = new URL(endpoint);
    const params = {
      mints: mints.join(','),
    };

    url.search = new URLSearchParams(params).toString();

    try {
      const response = await fetch(url);
      const data = await response.json();

      return data.data;
    } catch (error) {
      console.error(`Error in RaydiumDex:`, error);
      throw new Error('Raydium API error');
    }
  }

  async performTransaction(amount, contractAddress, side) {
    try {
      const response = await fetch('https://api.raydium.io/swap', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          amount,
          contractAddress,
          side,
          walletAddress: this.platform_wallet.publicKey.toString()
        })
      });

      const data = await response.json();

      return data.transactionId;
    } catch (error) {
      console.error(`Error in RaydiumDex (${side}):`, error);

      throw new Error('Raydium API error');
    }
  }
}
