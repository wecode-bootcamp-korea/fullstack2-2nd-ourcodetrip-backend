import { categoryService } from '../services';

const getServiceCategories = async (req, res, next) => {
  try {
    const serviceCategories = await categoryService.getServiceCategories();
    res.status(200).json({
      message: 'SUCCESS',
      data: serviceCategories,
    });
  } catch (err) {
    next(err);
  }
};

const getMainCategories = async (req, res, next) => {
  try {
    const mainCategories = await categoryService.getMainCategories();
    res.status(200).json({
      message: 'SUCCESS',
      data: mainCategories,
    });
  } catch (err) {
    next(err);
  }
};

const getMainAndSubCategories = async (req, res, next) => {
  try {
    const allCategories = await categoryService.getMainAndSubCategories();
    res.status(200).json({
      message: 'SUCCESS',
      data: allCategories,
    });
  } catch (err) {
    next(err);
  }
};

const getCityCategories = async (req, res, next) => {
  try {
    const cityCategories = await categoryService.getCityCategories();
    res.status(200).json({
      message: 'SUCCESS',
      data: cityCategories,
    });
  } catch (err) {
    next(err);
  }
};

export default {
  getServiceCategories,
  getMainCategories,
  getMainAndSubCategories,
  getCityCategories,
};
