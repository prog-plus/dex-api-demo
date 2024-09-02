import POSITION_TYPE_ENUM from '../enums/positionType.js';
import closeLongPositionOnDex from './closeLongPositionOnDex.js';

export default async function closePositionOnDex(wallet, amount, contractAddress, type) {
  switch (type) {
    case POSITION_TYPE_ENUM.long:
      return closeLongPositionOnDex(wallet, amount, contractAddress, 'sell');

    default:
      throw new Error('Invalid position type');
  }
}
