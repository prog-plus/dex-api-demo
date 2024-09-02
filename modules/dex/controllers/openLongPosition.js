import POSITION_TYPE_ENUM from '../enums/positionType.js';
import openPosition from '../services/openPosition.js';

export default async function openLongPositionController(req, res) {
  const { amount_token, asset_id, user_id } = req.body;
  try {
    const result = await openPosition(user_id, asset_id, amount_token, POSITION_TYPE_ENUM.long);

    if (!result) {
      throw new Error('Could not open long position');
    }

    return res.status(200).send({
      status: 'success',
      message: 'Long position opened',
    });
  } catch (error) {
    return res.status(500).send({
      status: 'error',
      message: error.message,
    });
  }
}
