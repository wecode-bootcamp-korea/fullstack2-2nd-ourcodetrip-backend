import request from 'supertest';
import app from '../src/app';

describe('errorHandler middleware', () => {
  test('invalidPathHandler', async () => {
    await request(app)
      .get('/not-found')
      .expect(404, { message: 'Not found api path' });
  });
});
