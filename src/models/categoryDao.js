import prisma from '../../prisma';

const getServiceCategories = async () => {
  const serviceCategories = await prisma.serviceCategory.findMany({
    orderBy: {
      id: 'asc',
    },
    select: {
      id: true,
      name: true,
      query: true,
    },
  });
  return serviceCategories;
};

const getMainCategories = async () => {
  const mainCategories = await prisma.mainCategory.findMany({
    orderBy: {
      id: 'asc',
    },
    select: {
      id: true,
      name: true,
      query: true,
    },
  });
  return mainCategories;
};

const getMainAndSubCategories = async () => {
  const allCategories = await prisma.mainCategory.findMany({
    include: {
      SubCategory: {
        select: {
          id: true,
          name: true,
          query: true,
        },
      },
    },
  });
  return allCategories;
};

const getCityCategories = async () => {
  const cityCategories = await prisma.city.findMany({
    include: {
      CityImage: {
        select: {
          imageUrl: true,
        },
      },
    },
  });

  return cityCategories;
};

export default {
  getServiceCategories,
  getMainCategories,
  getMainAndSubCategories,
  getCityCategories,
};
