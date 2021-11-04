import { categoryDao } from '../models';
import { NotFoundError } from '../utils/errors';

const getServiceCategories = async () => {
  const serviceCategories = await categoryDao.getServiceCategories();
  if (!serviceCategories) throw new NotFoundError();

  return serviceCategories;
};

const getMainCategories = async () => {
  const mainCategories = await categoryDao.getMainCategories();
  if (!mainCategories) throw new NotFoundError();

  return mainCategories;
};

const getMainAndSubCategories = async () => {
  const allCategories = await categoryDao.getMainAndSubCategories();
  if (!allCategories) throw new NotFoundError();

  return allCategories;
};

const getCityCategories = async () => {
  const cityCategories = await categoryDao.getCityCategories();
  if (!cityCategories) throw new NotFoundError();
  for (let city of cityCategories) {
    const { CityImage } = city;
    if (CityImage) {
      const filteredImages = CityImage.map(
        (el) => (el.ImageType = el.ImageType.name)
      );
      delete cityCategories.CityImage;
      cityCategories['CityImage'] = filteredImages;
    }
  }

  return cityCategories;
};

export default {
  getServiceCategories,
  getMainCategories,
  getMainAndSubCategories,
  getCityCategories,
};
