import express from 'express';
import categoryRouter from './categoryRouter';
import productRouter from './productRouter';
import userRouter from './userRouter';
import reviewRouter from './reviewRouter';
import { NotFoundError } from '../utils/errors';

const router = express.Router();

router.use('/categories', categoryRouter);
router.use('/products', productRouter);
router.use('/users', userRouter);
router.use('/reviews', reviewRouter);

router.get('/not-found', (req, res, next) => {
  throw new NotFoundError('Not found api path');
});

export default router;
