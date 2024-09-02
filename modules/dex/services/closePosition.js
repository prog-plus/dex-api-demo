import POSITION_TYPE_ENUM from '../enums/positionType.js';
import closeLongPosition from './closeLongPosition.js';

export default async function closePosition(user_id, asset_id, amount_token, type) {
  switch (type) {
    case POSITION_TYPE_ENUM.long:
      return closeLongPosition(user_id, asset_id, amount_token);

    default:
      throw new Error('Invalid position type');
  }
}
