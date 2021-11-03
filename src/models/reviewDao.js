import prisma from '../../prisma';

const getReservationsByProductId = async (productId) => {
  return await prisma.reservation.findMany({
    where: {
      productId,
    },
    select: {
      id: true,
    },
  });
};

const getReviewByReservationId = async (reservationId) => {
  const reviewData = await prisma.review.findUnique({
    where: {
      reservationId,
    },
    select: {
      id: true,
    },
  });

  const { id } = reviewData;
  return await prisma.review.findUnique({
    where: {
      reservationId,
    },
    select: {
      id: true,
      createdAt: true,
      rating: true,
      content: true,
      ReviewImage: {
        where: {
          reviewId: id,
        },
        select: {
          imageUrl: true,
        },
      },
      Reservation: {
        select: {
          User: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });
};

export default {
  getReservationsByProductId,
  getReviewByReservationId,
};
