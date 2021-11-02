import express from 'express';
import { reviewController } from '../controllers';

const reviewRouter = express.Router();

reviewRouter.get('/:productId', reviewController.getReviewsByProductId);

export default reviewRouter;
