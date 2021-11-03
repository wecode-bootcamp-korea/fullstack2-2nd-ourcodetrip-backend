import express from 'express';
import productController from '../controllers/productController';
import { authenticateJWT } from '../middlewares/passportJwt';

const productRouter = express.Router();

productRouter.get('/offers', authenticateJWT, productController.getProductList);
productRouter.get(
  '/classification/:id',
  authenticateJWT,
  productController.getProductsByClassId
);

export default productRouter;
