import prisma from '../../prisma';

const getProductTypeById = async (productId) => {
  return await prisma.product.findUnique({
    where: {
      id: productId,
    },
    select: {
      productTypeId: true,
    },
  });
};

const getProductTypeNameById = async (productTypeId) => {
  const { name } = await prisma.productType.findUnique({
    where: {
      id: productTypeId,
    },
  });

  return name;
};

const getImageTypeIdByName = async (name) => {
  const { id: imageTypeId } = await prisma.imageType.findUnique({
    where: {
      name,
    },
  });

  return imageTypeId;
};

const getTourCardByProductId = async (productId) => {
  const imageTypeId = await getImageTypeIdByName('thumbnail');

  return await prisma.tour.findUnique({
    where: {
      productId,
    },
    select: {
      productId: true,
      price: true,
      discountRate: true,
      Product: {
        select: {
          name: true,
          ProductImage: {
            where: {
              imageTypeId,
            },
            select: {
              imageUrl: true,
            },
          },
          ProductOption: {
            select: {
              OptionList: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
      SubCategory: {
        select: {
          name: true,
        },
      },
      City: {
        select: {
          name: true,
        },
      },
    },
  });
};

const getTickeyCardByProductId = async (productId) => {
  const imageTypeId = await getImageTypeIdByName('thumbnail');

  return await prisma.ticket.findUnique({
    where: {
      productId,
    },
    select: {
      productId: true,
      standardPrice: true,
      discountRate: true,
      Product: {
        select: {
          name: true,
          ProductImage: {
            where: {
              imageTypeId,
            },
            select: {
              imageUrl: true,
            },
          },
          ProductOption: {
            select: {
              OptionList: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
      SubCategory: {
        select: {
          name: true,
        },
      },
      City: {
        select: {
          name: true,
        },
      },
    },
  });
};

export default {
  getProductTypeById,
  getProductTypeNameById,
  getTourCardByProductId,
  getTickeyCardByProductId,
};
