import request from 'supertest';
import app from '../src/app';
import prisma from '../prisma';
jest.mock('node-fetch');
import fetch from 'node-fetch';
const { Response } = jest.requireActual('node-fetch');
import {
  usersData,
  platformData,
  userProfileImageData,
  KAKAO_ACCESS_TOKEN,
  kakaoSuccessResData,
  kakaoFailedResData,
} from './data/user';

const hasError = (status, message) => {
  return (res) => {
    expect(res.status).toEqual(status);
    expect(res).toHaveProperty('message', message);
  };
};

const hasData = (status, callback) => {
  return (res) => {
    expect(res.status).toEqual(status);
    if (!res.body.data) throw new Error('missing data key');

    callback(res.body.data);
  };
};

beforeEach(async () => {
  await prisma.userProfileImage.deleteMany();
  await prisma.user.deleteMany();
  await prisma.platform.deleteMany();
});

afterEach(async () => {
  await prisma.userProfileImage.deleteMany();
  await prisma.user.deleteMany();
  await prisma.platform.deleteMany();
});

describe('/users', () => {
  test('auth kakao user - case 1', async () => {
    await prisma.platform.createMany({ data: platformData });
    fetch.mockReturnValue(
      Promise.resolve(new Response(JSON.stringify(kakaoSuccessResData)))
    );

    await request(app)
      .post('/users/auth/kakao')
      .set('Authorization', KAKAO_ACCESS_TOKEN)
      .send({})
      .expect(201);
  });

  test('auth kakao user - case 0', async () => {
    await prisma.platform.createMany({ data: platformData });

    await request(app).post('/users/auth/kakao').send({}).expect(401);
  });

  test('auth kakao user - case -1', async () => {
    await prisma.platform.createMany({ data: platformData });
    fetch.mockReturnValue(
      Promise.resolve(new Response(JSON.stringify(kakaoFailedResData)))
    );
    await request(app)
      .post('/users/auth/kakao')
      .set('Authorization', KAKAO_ACCESS_TOKEN)
      .send({})
      .expect(401);
  });

  test('get user by id - case 1', async () => {
    await prisma.platform.createMany({ data: platformData });
    await prisma.user.createMany({ data: usersData });
    await prisma.userProfileImage.createMany({ data: userProfileImageData });
    const USER_ID = 1;

    await request(app)
      .get(`/users/${USER_ID}`)
      .expect(
        hasData(200, (data) => {
          expect(data).toHaveProperty('name', '테스트');
        })
      );
  });

  test('get user by id - case 0', async () => {
    await prisma.platform.createMany({ data: platformData });
    await prisma.user.createMany({ data: usersData });
    await prisma.userProfileImage.createMany({ data: userProfileImageData });

    await request(app)
      .get('/users/')
      .expect(302)
      .then((res) => hasError(404, 'Not found api path'));
  });

  test('get user by id - case -1', async () => {
    await prisma.platform.createMany({ data: platformData });
    await prisma.user.createMany({ data: usersData });
    await prisma.userProfileImage.createMany({ data: userProfileImageData });

    const USER_EMAIL = 'test@test.com';
    await request(app)
      .get(`/users/${USER_EMAIL}`)
      .expect(400)
      .then((res) =>
        hasError(400, `Bad Request, id '${USER_EMAIL}' is not a number`)
      );
  });
});
