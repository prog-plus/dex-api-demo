import request from 'supertest';

import app from '../../../../server/index.js';
import closePosition from '../../services/closePosition.js';

jest.mock('../../services/closePosition.js');

describe('closeLongPositionController', () => {
  it('should close a long position successfully', async () => {
    closePosition.mockResolvedValue(true);

    const response = await request(app)
      .post('/position/long/close')
      .send({ amount_token: 50, asset_id: '1', user_id: '1' });

    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe('success');
    expect(response.body.message).toBe('Long position closed');
  });

  it('should return an error if closing a long position fails', async () => {
    closePosition.mockResolvedValue(false);

    const response = await request(app)
      .post('/position/long/close')
      .send({ amount_token: 50, asset_id: '1', user_id: '1' });

    expect(response.statusCode).toBe(500);
    expect(response.body.status).toBe('error');
    expect(response.body.message).toBe('Could not open long position');
  });

  it('should return an error if an exception is thrown', async () => {
    closePosition.mockImplementation(() => {
      throw new Error('Unexpected error');
    });

    const response = await request(app)
      .post('/position/long/close')
      .send({ amount_token: 50, asset_id: '1', user_id: '1' });

    expect(response.statusCode).toBe(500);
    expect(response.body.status).toBe('error');
    expect(response.body.message).toBe('Unexpected error');
  });
});
