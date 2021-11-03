import { BadRequestError, NotFoundError } from '../utils/errors';
import { reviewDao } from '../models';

const getInitialReviewData = async (productId) => {
  const parsedProductId = parseInt(productId);
  if (isNaN(parsedProductId)) {
    throw new BadRequestError(`Bad Request, id '${productId}' is not a number`);
  }
  const allReviewData = await getAllReviewsByProductId(parsedProductId);
  if (allReviewData.length === 0) return null;

  const data = getResReviewData(allReviewData);
  return data;
};

const getAdditionalReview = async (productId, offset) => {
  const parsedProductId = parseInt(productId);
  const parsedOffset = parseInt(offset);
  if (isNaN(parsedProductId) || isNaN(parsedOffset)) {
    throw new BadRequestError(
      `Bad Request, id '${productId}' or offset '${offset}' is not a number`
    );
  }
  const allReviewData = await getAllReviewsByProductId(parsedProductId);
  if (allReviewData.length === 0) return null;

  const pagination = parsedOffset - 1;
  const data = {
    threads:
      3 * pagination < allReviewData.length
        ? allReviewData.slice(3 * pagination, 3 * (pagination + 1))
        : null,
  };
  return data;
};

const getAllReviewsByProductId = async (productId) => {
  const reservationsData = await reviewDao.getReservationsByProductId(
    productId
  );
  const allReviewData = [];
  for (let reservation of reservationsData) {
    const review = await reviewDao.getReviewByReservationId(reservation.id);
    const { ReviewImage } = review;
    const changedUrl =
      ReviewImage.length !== 0
        ? ReviewImage.map((el) => (el = el.imageUrl))[0]
        : null;
    delete review.ReviewImage;
    review['reviewImageUrl'] = changedUrl;
    allReviewData.push(review);
  }

  return allReviewData;
};

const getResReviewData = (allReviewData) => {
  const totalReviews = allReviewData.length;
  const totalReviewsForEachRating = [0, 0, 0, 0, 0];
  let totalReviewImages = 0;
  let reviewImages = [];
  for (let review of allReviewData) {
    const {
      id,
      rating,
      reviewImageUrl,
      Reservation: {
        User: { name: userName },
      },
    } = review;
    review['userName'] = userName;
    delete review.Reservation;
    if (rating === 5) totalReviewsForEachRating[0]++;
    if (rating === 4) totalReviewsForEachRating[1]++;
    if (rating === 3) totalReviewsForEachRating[2]++;
    if (rating === 2) totalReviewsForEachRating[3]++;
    if (rating === 1) totalReviewsForEachRating[4]++;
    if (reviewImageUrl !== null) {
      totalReviewImages++;
      reviewImages = reviewImages.concat({ id, reviewImageUrl });
    }
  }
  const [ratingFive, ratingFour, ratingThree, ratingTwo, ratingOne] =
    totalReviewsForEachRating;
  let ratingAvg =
    (5 * ratingFive +
      4 * ratingFour +
      3 * ratingThree +
      2 * ratingTwo +
      ratingOne) /
    totalReviews;
  ratingAvg = Math.round(ratingAvg * 10) / 10;
  return {
    overview: {
      totalReviews,
      ratingAvg,
      totalReviewsForEachRating,
      totalReviewImages,
    },
    reviewImages,
    threads: allReviewData.slice(0, 3),
  };
};

export default { getInitialReviewData, getAdditionalReview };
