import request from 'supertest';

import app from '../../../../server/index.js';
import openPosition from '../../services/openPosition.js';

jest.mock('../../services/openPosition.js');

describe('openLongPositionController', () => {
  it('should open a long position successfully', async () => {
    openPosition.mockResolvedValue(true);

    const response = await request(app)
      .post('/position/long/open')
      .send({ amount_token: 50, asset_id: '1', user_id: '1' });

    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe('success');
    expect(response.body.message).toBe('Long position opened');
  });

  it('should return an error if opening a long position fails', async () => {
    openPosition.mockResolvedValue(false);

    const response = await request(app)
      .post('/position/long/open')
      .send({ amount_token: 50, asset_id: '1', user_id: '1' });

    expect(response.statusCode).toBe(500);
    expect(response.body.status).toBe('error');
    expect(response.body.message).toBe('Could not open long position');
  });

  it('should return an error if an exception is thrown', async () => {
    openPosition.mockImplementation(() => {
      throw new Error('Unexpected error');
    });

    const response = await request(app)
      .post('/position/long/open')
      .send({ amount_token: 50, asset_id: '1', user_id: '1' });

    expect(response.statusCode).toBe(500);
    expect(response.body.status).toBe('error');
    expect(response.body.message).toBe('Unexpected error');
  });
});
