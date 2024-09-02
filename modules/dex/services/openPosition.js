import POSITION_TYPE_ENUM from '../enums/positionType.js';
import openLongPosition from './openLongPosition.js';

export default async function openPosition(user_id, asset_id, amount_token, type) {
  switch (type) {
    case POSITION_TYPE_ENUM.long:
      return openLongPosition(user_id, asset_id, amount_token);

    default:
      throw new Error('Invalid position type');
  }
}
