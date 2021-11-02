import { reviewService, userService } from '.';
import productDao from '../models/productDao';
import { NotFoundError } from '../utils/errors';

const getProductCardById = async (productId, userId) => {
  const parsedProductId = parseInt(productId);
  if (isNaN(parsedProductId)) {
    throw new BadRequestError(`Bad Request, id '${productId}' is not a number`);
  }
  const productTypeData = await productDao.getProductTypeById(parsedProductId);
  if (!productTypeData) throw new NotFoundError('Not found product');

  const { productTypeId } = productTypeData;

  const productTypeName = await productDao.getProductTypeNameById(
    productTypeId
  );
  let productCardData = {};
  switch (productTypeName) {
    case '투어':
      productCardData = await productDao.getTourCardByProductId(
        parsedProductId
      );
      break;
    case '티켓':
      productCardData = await productDao.getTickeyCardByProductId(
        parsedProductId
      );
      const { standardPrice: price } = productCardData;
      productCardData['price'] = price;
      delete productCardData.standardPrice;
      break;
  }

  productCardData = getOrderedProductData(productCardData);

  const reviewData = await reviewService.getInitialReviewData(parsedProductId);
  let totalReviews, ratingAvg;
  if (!reviewData) {
    totalReviews = null;
    ratingAvg = null;
  } else {
    totalReviews = reviewData.overview.totalReviews;
    ratingAvg = reviewData.overview.ratingAvg;
  }

  let onUsersWishList;
  if (!userId) {
    onUsersWishList = false;
  } else {
    onUsersWishList = (await userService.isWishlistItem(
      userId,
      parsedProductId
    ))
      ? true
      : false;
  }
  productCardData = {
    ...productCardData,
    totalReviews,
    ratingAvg,
    onUsersWishList,
  };

  return productCardData;
};

// 하드 코딩 - 리팩토링 필요
const getOrderedProductData = (productData) => {
  const {
    productId: id,
    price,
    discountRate,
    Product: { name: productName, ProductImage, ProductOption },
    SubCategory: { name: subCategory },
    City: { name: city },
  } = productData;

  productData['id'] = id;
  productData['price'] = price;
  productData['offerPrice'] = discountRate
    ? Math.round(price * (1 - discountRate))
    : price;
  productData['productName'] = productName;
  const changedUrls =
    ProductImage.length !== 0
      ? ProductImage.map((el) => (el = el.imageUrl))
      : null;
  productData['imageUrl'] = changedUrls ? changedUrls[0] : null;
  const changedOptions =
    ProductOption.length !== 0
      ? ProductOption.map((el) => (el = el.OptionList.name))
      : null;
  productData['productOptions'] = changedOptions;
  productData['subCategory'] = subCategory;
  productData['city'] = city;

  delete productData.productId;
  delete productData.discountRate;
  delete productData.Product;
  delete productData.SubCategory;
  delete productData.City;

  return productData;
};

const sortProductCardObjByCity = (productList) => {
  const sortedProductObj = {};
  const citiesByProduct = [];
  for (let product of productList) {
    citiesByProduct.push(product.city);
  }

  const uniqueCitySet = new Set(citiesByProduct);
  const uniqueCityArr = [...uniqueCitySet];
  for (let city of uniqueCityArr) {
    sortedProductObj[city] = [];
    for (let product of productList) {
      if (product.city === city) {
        sortedProductObj[city].push(product);
      }
    }
  }

  return sortedProductObj;
};

export default { getProductCardById, sortProductCardObjByCity };
