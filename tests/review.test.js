import request from 'supertest';
import app from '../src/app';
import prisma from '../prisma';
import {
  additionalReivewData,
  initialReviewData,
  paymentTypeData,
  platformData,
  productData,
  productTypeData,
  reservationData,
  reviewData,
  reviewImageData,
  userData,
} from './data/review';

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
  await prisma.reviewImage.deleteMany();
  await prisma.review.deleteMany();
  await prisma.reservation.deleteMany();
  await prisma.paymentType.deleteMany();
  await prisma.product.deleteMany();
  await prisma.productType.deleteMany();
  await prisma.user.deleteMany();
  await prisma.platform.deleteMany();
});

afterEach(async () => {
  await prisma.reviewImage.deleteMany();
  await prisma.review.deleteMany();
  await prisma.reservation.deleteMany();
  await prisma.paymentType.deleteMany();
  await prisma.product.deleteMany();
  await prisma.productType.deleteMany();
  await prisma.user.deleteMany();
  await prisma.platform.deleteMany();
});

const createData = async () => {
  await prisma.platform.createMany({ data: platformData });
  await prisma.user.createMany({ data: userData });
  await prisma.productType.createMany({ data: productTypeData });
  await prisma.product.createMany({ data: productData });
  await prisma.paymentType.createMany({ data: paymentTypeData });
  await prisma.reservation.createMany({ data: reservationData });
  await prisma.review.createMany({ data: reviewData });
  await prisma.reviewImage.createMany({ data: reviewImageData });
};

describe('/reviews/:productId', () => {
  test('get init review data - case 1', async () => {
    await createData();
    const { data: expectedData } = initialReviewData;
    const PRODUCT_ID = 1;

    await request(app)
      .get(`/reviews/${PRODUCT_ID}`)
      .expect(
        hasData(200, (data) => {
          expect(data).toMatchObject(expectedData);
        })
      );
  });

  test('get init review data - case 0', async () => {
    await createData();

    await request(app)
      .get(`/reviews/`)
      .expect(302)
      .then(() => hasError(404, 'Not found api path'));
  });

  test('get init review data - case -1', async () => {
    await createData();
    const INVALID_DATA = 'tour';

    await request(app)
      .get(`/reviews/${INVALID_DATA}`)
      .expect(400)
      .then((res) =>
        hasError(400, `Bad Request, id '${INVALID_DATA}' is not a number`)
      );
  });
});

describe('/reviews/:productId?offset=[some number]', () => {
  const PRODUCT_ID = 1;
  test('get additional review data - case 1', async () => {
    await createData();
    const { data: expectedData } = additionalReivewData;
    const OFFSET = 2;

    await request(app)
      .get(`/reviews/${PRODUCT_ID}?offset=${OFFSET}`)
      .expect(
        hasData(200, (data) => {
          expect(data).toMatchObject(expectedData);
        })
      );
  });

  test('get additional review data - case 0', async () => {
    await createData();
    const { data: expectedData } = initialReviewData;

    await request(app)
      .get(`/reviews/${PRODUCT_ID}?offset=`)
      .expect(
        hasData(200, (data) => {
          expect(data).toMatchObject(expectedData);
        })
      );
  });

  test('get additional review data - case -1', async () => {
    await createData();
    const INVALID_DATA = 'page';

    await request(app)
      .get(`/reviews/${PRODUCT_ID}?offset=${INVALID_DATA}`)
      .expect(400)
      .then((res) =>
        hasError(
          400,
          `Bad Request, id '${PRODUCT_ID}' or offset '${INVALID_DATA}' is not a number`
        )
      );
  });
});
