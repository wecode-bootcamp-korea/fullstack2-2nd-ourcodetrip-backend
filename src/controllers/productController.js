import { productService } from '../services';
import { BadRequestError } from '../utils/errors';

const getProductList = async (req, res, next) => {
  try {
    const userId = req.userId;
    const query = req.query;
    const { city } = query;
    console.log(city);
    if (!city) throw new BadRequestError('Bad Request, city query must exist');

    const products = await productService.getProductsByQuery(query, userId);
    res.status(200).json({ message: 'success', data: products });
  } catch (err) {
    next(err);
  }
};

const getProductsByClassId = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { id: classificationId } = req.params;
    if (!classificationId) throw new BadRequestError();

    const products = await productService.getProductsByClassId(
      classificationId,
      userId
    );
    res.status(200).json({ message: 'success', data: products });
  } catch (err) {
    next(err);
  }
};

const getProductDetailInfoByProductId = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const productDetailData =
      await productService.getProductDetailInfoByProductId(productId);
    res.status(200).json({
      message: 'SUCCESS',
      data: productDetailData,
    });
  } catch (err) {
    next(err);
  }
};

export default {
  getProductList,
  getProductsByClassId,
  getProductDetailInfoByProductId,
};
