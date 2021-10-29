import reqeust from 'supertest';
import app from '../src/app';
import { successData, invalidKeyData, invalidValueData } from './data/sample';

describe('/samples', () => {
  test('ping to server - case 1', async () => {
    await reqeust(app)
      .post('/ping')
      .send(successData)
      .expect(200, { message: 'pong' });
  });

  test('ping to server - case 0', async () => {
    await reqeust(app)
      .post('/ping')
      .send()
      .expect(400, { message: 'Bad Request' });
  });

  test('ping to server - case -1 : invalid key', async () => {
    await reqeust(app)
      .post('/ping')
      .send(invalidKeyData)
      .expect(400, { message: 'Bad Request' });
  });

  test('ping to server - case -1 : invalid value', async () => {
    await reqeust(app)
      .post('/ping')
      .send(invalidValueData)
      .expect(400, { message: 'Bad Request' });
  });
});
