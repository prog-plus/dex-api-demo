import POSITION_TYPE_ENUM from '../enums/positionType.js';
import openLongPositionOnDex from './openLongPositionOnDex.js';

export default async function openPositionOnDex(wallet, amount, contractAddress, type) {
  switch (type) {
    case POSITION_TYPE_ENUM.long:
      return openLongPositionOnDex(wallet, amount, contractAddress, 'buy');

    default:
      throw new Error('Invalid position type');
  }
}
