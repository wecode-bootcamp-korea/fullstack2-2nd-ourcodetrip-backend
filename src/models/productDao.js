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

const getTicketCardByProductId = async (productId) => {
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

const getTourCardsByQuery = async (query) => {
  const imageTypeId = await getImageTypeIdByName('thumbnail');
  const { city, category } = query;
  let main, filterdIdArr;
  if (category) {
    main = category.main;
    const categoryData = await prisma.mainCategory.findUnique({
      where: {
        query: main,
      },
      select: {
        id: true,
      },
    });
    const mainCategoryId = categoryData.id;

    const subCategoryIdArr = await prisma.subCategory.findMany({
      where: {
        mainCategoryId,
      },
      select: {
        id: true,
      },
    });
    filterdIdArr = subCategoryIdArr.map((el) => (el = el.id));
  }

  const dataObj = await prisma.city.findUnique({
    where: {
      englishName: city,
    },
    select: {
      id: true,
    },
  });

  const { id: cityId } = dataObj;

  return await prisma.tour.findMany({
    where: {
      cityId,
      subCategoryId: { in: filterdIdArr },
    },
    select: {
      productId: true,
      price: true,
      discountRate: true,
      startDate: true,
      endDate: true,
      Product: {
        select: {
          name: true,
          createdAt: true,
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

const getTicketCardsByQuery = async (query) => {
  const imageTypeId = await getImageTypeIdByName('thumbnail');
  const { city, category } = query;
  let main, filterdIdArr;
  if (category) {
    main = category.main;

    const categoryData = await prisma.mainCategory.findUnique({
      where: {
        query: main,
      },
      select: {
        id: true,
      },
    });
    const mainCategoryId = categoryData.id;

    const subCategoryIdArr = await prisma.subCategory.findMany({
      where: {
        mainCategoryId,
      },
      select: {
        id: true,
      },
    });
    filterdIdArr = subCategoryIdArr.map((el) => (el = el.id));
  }

  const { id: cityId } = await prisma.city.findUnique({
    where: {
      englishName: city,
    },
    select: {
      id: true,
    },
  });

  return await prisma.ticket.findMany({
    where: {
      cityId,
      subCategoryId: { in: filterdIdArr },
    },
    select: {
      productId: true,
      standardPrice: true,
      discountRate: true,
      expireDate: true,
      Product: {
        select: {
          name: true,
          createdAt: true,
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

const getProductIdArrByClassId = async (classificationId) => {
  return await prisma.classificationProduct.findMany({
    where: {
      classificationId,
    },
    select: {
      productId: true,
    },
  });
};

const getClassificationNameById = async (classificationId) => {
  const { name } = await prisma.classification.findUnique({
    where: {
      id: classificationId,
    },
    select: {
      name: true,
    },
  });
  return name;
};

const getSubCategoryNameByQuery = async (query) => {
  const { name } = await prisma.subCategory.findUnique({
    where: {
      query,
    },
    select: {
      name: true,
    },
  });
  return name;
};

const getProductsByOptionName = async (optionListName) => {
  const { optionListId } = await prisma.optionList.findUnique({
    where: {
      name: optionListName,
    },
    select: {
      id: true,
    },
  });

  return await prisma.productOption.findMany({
    where: {
      optionListId,
    },
    select: {
      id: true,
    },
  });
};

const getWishCountByProductId = async (productId) => {
  return await prisma.wishlist.count({
    where: {
      productId,
    },
  });
};

const getTourDetailInfoByProductId = async (productId) => {
  const imageTypeId = await getImageTypeIdByName('detail');

  const tour = prisma.tour.findUnique({
    where: {
      productId,
    },
    select: {
      productId: true,
      price: true,
      discountRate: true,
      startDate: true,
      endDate: true,
      maximumHeadCount: true,
      minimumHeadCount: true,
      Product: {
        select: {
          name: true,
          ProductType: {
            select: {
              name: true,
            },
          },
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
          _count: {
            select: {
              Wishlist: true,
            },
          },
        },
      },
      City: {
        select: {
          name: true,
          Country: {
            select: {
              name: true,
            },
          },
        },
      },
      Partner: {
        select: {
          name: true,
          introduce: true,
        },
      },
    },
  });
  return tour;
};

const getTicketDetailInfoByProductId = async (productId) => {
  const imageTypeId = await getImageTypeIdByName('detail');

  const ticket = await prisma.ticket.findUnique({
    where: {
      productId,
    },
    select: {
      productId: true,
      standardPrice: true,
      discountRate: true,
      expireDate: true,
      TicketOption: {
        select: {
          id: true,
          name: true,
          price: true,
          discountRate: true,
        },
      },
      Product: {
        select: {
          name: true,
          ProductType: {
            select: {
              name: true,
            },
          },
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
          _count: {
            select: {
              Wishlist: true,
            },
          },
        },
      },
      City: {
        select: {
          name: true,
          Country: {
            select: {
              name: true,
            },
          },
        },
      },
      Partner: {
        select: {
          name: true,
          introduce: true,
        },
      },
    },
  });
  return ticket;
};

export default {
  getProductTypeById,
  getProductTypeNameById,
  getTourCardByProductId,
  getTicketCardByProductId,
  getProductIdArrByClassId,
  getClassificationNameById,
  getTourCardsByQuery,
  getTicketCardsByQuery,
  getSubCategoryNameByQuery,
  getProductsByOptionName,
  getWishCountByProductId,
  getTourDetailInfoByProductId,
  getTicketDetailInfoByProductId,
};
