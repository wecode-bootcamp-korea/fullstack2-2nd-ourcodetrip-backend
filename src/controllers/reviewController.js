import { reviewService } from '../services';

const getReviewsByProductId = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const { offset } = req.query;
    let data;
    if (!offset) {
      data = await reviewService.getInitialReviewData(productId);
    } else {
      data = await reviewService.getAdditionalReview(productId, offset);
    }
    res.status(200).json({ message: 'success', data });
  } catch (err) {
    next(err);
  }
};

export default { getReviewsByProductId };
