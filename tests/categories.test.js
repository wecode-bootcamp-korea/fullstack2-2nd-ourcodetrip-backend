import request from 'supertest';
import app from '../src/app';
import prisma from '../prisma';
import {
  serviceCategoryData,
  mainCategoryData,
  subCategoryData,
  countryData,
  cityCategoryData,
  cityImageData,
} from './data/categories';

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
  await prisma.subCategory.deleteMany();
  await prisma.mainCategory.deleteMany();
  await prisma.serviceCategory.deleteMany();
  await prisma.cityImage.deleteMany();
  await prisma.city.deleteMany();
  await prisma.country.deleteMany();
});

afterEach(async () => {
  await prisma.subCategory.deleteMany();
  await prisma.mainCategory.deleteMany();
  await prisma.serviceCategory.deleteMany();
  await prisma.cityImage.deleteMany();
  await prisma.city.deleteMany();
  await prisma.country.deleteMany();
});

describe('categories', () => {
  test('service categories - case 1', async () => {
    await prisma.serviceCategory.createMany({ data: serviceCategoryData });
    await request(app).get('/categories/service').expect(200);
  });

  test('service categories - case 0', async () => {
    await prisma.serviceCategory.createMany({ data: serviceCategoryData });
    await request(app)
      .get('/categories')
      .expect(302)
      .then(() => hasError(404, 'Not found api path'));
  });

  test('service categories - case -1', async () => {
    await prisma.serviceCategory.createMany({ data: serviceCategoryData });
    await request(app)
      .get('/categories/ser')
      .expect(302)
      .then(() => hasError(404, 'Not found api path'));
  });

  test('main categories - case 1', async () => {
    await prisma.serviceCategory.createMany({ data: serviceCategoryData });
    await prisma.mainCategory.createMany({ data: mainCategoryData });
    await request(app).get('/categories/main').expect(200);
  });

  test('main categories - case 0', async () => {
    await prisma.serviceCategory.createMany({ data: serviceCategoryData });
    await prisma.mainCategory.createMany({ data: mainCategoryData });
    await request(app)
      .get('/category')
      .expect(302)
      .then(() => hasError(404, 'Not found api path'));
  });

  test('main categories - case -1', async () => {
    await prisma.serviceCategory.createMany({ data: serviceCategoryData });
    await prisma.mainCategory.createMany({ data: mainCategoryData });
    await request(app)
      .get('/category/ma')
      .expect(302)
      .then(() => hasError(404, 'Not found api path'));
  });

  test('main&sub categories - case 1', async () => {
    await prisma.serviceCategory.createMany({ data: serviceCategoryData });
    await prisma.mainCategory.createMany({ data: mainCategoryData });
    await prisma.subCategory.createMany({ data: subCategoryData });

    await request(app).get('/categories/main&sub').expect(200);
  });

  test('main&sub categories - case 0', async () => {
    await prisma.serviceCategory.createMany({ data: serviceCategoryData });
    await prisma.mainCategory.createMany({ data: mainCategoryData });
    await prisma.subCategory.createMany({ data: subCategoryData });

    await request(app)
      .get('/categories')
      .expect(302)
      .then(() => hasError(404, 'Not found api path'));
  });

  test('main&sub categories - case -1', async () => {
    await prisma.serviceCategory.createMany({ data: serviceCategoryData });
    await prisma.mainCategory.createMany({ data: mainCategoryData });
    await prisma.subCategory.createMany({ data: subCategoryData });

    await request(app)
      .get('/categories/ms')
      .expect(302)
      .then(() => hasError(404, 'Not found api path'));
  });

  test('city categories - case 1', async () => {
    await prisma.country.createMany({ data: countryData });
    await prisma.city.createMany({ data: cityCategoryData });
    await prisma.cityImage.createMany({ data: cityImageData });

    await request(app).get('/categories/city').expect(200);
  });

  test('city categories - case 0', async () => {
    await prisma.country.createMany({ data: countryData });
    await prisma.city.createMany({ data: cityCategoryData });
    await prisma.cityImage.createMany({ data: cityImageData });

    await request(app)
      .get('/categories')
      .expect(302)
      .then(() => hasError(404, 'Not found api path'));
  });

  test('city categories - case -1', async () => {
    await prisma.country.createMany({ data: countryData });
    await prisma.city.createMany({ data: cityCategoryData });
    await prisma.cityImage.createMany({ data: cityImageData });

    await request(app)
      .get('/categories/ci')
      .expect(302)
      .then(() => hasError(404, 'Not found api path'));
  });
});
