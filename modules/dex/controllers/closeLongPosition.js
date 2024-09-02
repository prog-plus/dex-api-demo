import POSITION_TYPE_ENUM from '../enums/positionType.js';
import closePosition from '../services/closePosition.js';

export default async function closeLongPositionController(req, res) {
  const { amount_token, asset_id, user_id } = req.body;

  try {
    const result = await closePosition(user_id, asset_id, amount_token, POSITION_TYPE_ENUM.long);

    if (!result) {
      throw new Error('Could not close long position');
    }

    return res.status(200).send({
      status: 'success',
      message: 'Long position closed',
    });
  } catch (error) {
    return res.status(500).send({
      status: 'error',
      message: error.message,
    });
  }
}
