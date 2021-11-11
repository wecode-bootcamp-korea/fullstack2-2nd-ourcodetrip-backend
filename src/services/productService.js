import { reviewService, userService } from '.';
import { productDao } from '../models';
import { parseAndFormat, queryStringFormat } from '../utils/queryStringMapper';
import { BadRequestError, NotFoundError } from '../utils/errors';

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
      productCardData = await productDao.getTicketCardByProductId(
        parsedProductId
      );
      const { standardPrice: price } = productCardData;
      productCardData['price'] = price;
      delete productCardData.standardPrice;
      break;
  }

  productCardData = getOrderedProductData(productCardData);

  const reviewWishData = await getReviewWishData(parsedProductId, userId);
  const { totalReviews, rating, onUsersWishList } = reviewWishData;
  productCardData = {
    ...productCardData,
    totalReviews,
    rating,
    onUsersWishList,
  };

  return productCardData;
};

const getProductsByClassId = async (classificationId, userId) => {
  const parsedId = parseInt(classificationId);
  if (isNaN(parsedId))
    throw new BadRequestError(
      `Bad Request, id '${classificationId}' is not a number`
    );

  const classificationName = await productDao.getClassificationNameById(
    parsedId
  );

  const productArr = await productDao.getProductIdArrByClassId(parsedId);
  const productIdArr = [];
  for (let product of productArr) {
    productIdArr.push(product.productId);
  }

  const products = [];
  for (let productId of productIdArr) {
    const productCardData = await getProductCardById(productId, userId);
    products.push(productCardData);
  }

  return {
    title: classificationName,
    link: '/',
    list: products,
  };
};

const getProductsByQuery = async (query, userId) => {
  const inputQuerieKeys = Object.keys(query);
  for (let eachQueryKey of inputQuerieKeys) {
    if (!(eachQueryKey in queryStringFormat)) {
      throw new BadRequestError('Bad request, invalid query string');
    }
    parseAndFormat(query, eachQueryKey);
  }

  let tours = await productDao.getTourCardsByQuery(query);
  let tickets = await productDao.getTicketCardsByQuery(query);
  tickets.forEach((el) => {
    const { standardPrice: price } = el;
    el['price'] = price;
    delete el.standardPrice;
  });
  if (!tours) {
    tours = [];
  }
  if (!tickets) {
    tickets = [];
  }

  let products = tours.concat(tickets);
  if (products.length === 0) {
    return products;
  }

  products.filter((el) => (el = getOrderedProductData(el)));
  const data = [];
  for (let product of products) {
    const reviewWishData = await getReviewWishData(product.id, userId);
    const { totalReviews, rating, onUsersWishList } = reviewWishData;
    product = {
      ...product,
      totalReviews,
      rating,
      onUsersWishList,
    };
    data.push(product);
  }

  const filteredData = await getFilteredData(query, data);
  return filteredData;
};

const getWishCountByProductId = async (productId) => {
  const parsedProductId = parseInt(productId);
  if (isNaN(parsedProductId))
    throw new BadRequestError(`Bad Request, id '${productId}' is not a number`);

  const count = await productDao.getWishCountByProductId(parsedProductId);
  return count;
};

const getFilteredData = async (query, data) => {
  const {
    category,
    availableDate,
    price,
    reviewScore,
    confirm_type: confirmType,
    sort,
  } = query;

  if (category) {
    const { sub } = category;
    if (sub) {
      data = await filterBySubCategoryId(sub, data);
    }
  }
  if (availableDate) {
    data = filterByAvailableDate(availableDate, data);
  }
  if (price) {
    data = filterByPrice(price, data);
  }
  if (reviewScore) {
    data = filterByReviewScore(reviewScore, data);
  }
  if (confirmType) {
    data = await filterByConfirmType(data);
  }
  if (sort) {
    data = filterBySort(sort, data);
  }

  return data;
};

const filterBySubCategoryId = async (subQuery, data) => {
  const subCategoryName = await productDao.getSubCategoryNameByQuery(subQuery);
  const filteredData = data.filter(
    (product) => product.category === subCategoryName
  );
  console.log(filteredData);
  return filteredData;
};

const filterByAvailableDate = (availableDate, data) => {
  const { minRangeValue, maxRangeValue } = availableDate;
  const minDate = new Date(minRangeValue);
  const maxDate = new Date(maxRangeValue);

  const filteredData = [];
  for (let product of data) {
    const { startDate, endDate, expireDate } = product;

    if (startDate && endDate) {
      if (startDate < minDate && endDate > maxDate) {
        filteredData.push(product);
      }
    }
    if (expireDate) {
      if (product.expireDate > maxDate) {
        filteredData.push(product);
      }
    }
  }
  return filteredData;
};

const filterByPrice = (price, data) => {
  const { minRangeValue, maxRangeValue } = price;
  const minPrice = parseInt(minRangeValue);
  const maxPrice = parseInt(maxRangeValue);
  const filteredData = data.filter(
    (product) =>
      product.offerPrice >= minPrice && product.offerPrice <= maxPrice
  );

  return filteredData;
};

const filterByReviewScore = (reviewScore, data) => {
  data.forEach((product) => (product.rating = product.rating || 0));
  let filteredData;
  if (reviewScore === '4~') {
    filteredData = data.filter((product) => product.rating >= 4);
  }
  if (reviewScore === '5') {
    filteredData = data.filter((product) => product.rating === 5);
  }

  return filteredData;
};

const filterByConfirmType = async (data) => {
  const filteredData = data.filter((el) => el.quickBooking === true);
  return filteredData;
};

const filterBySort = (sort, data) => {
  data.forEach((product) => (product.rating = product.rating || 0));

  const { method } = sort;
  let { sortBy } = sort;
  if (sortBy === 'price') sortBy = 'offerPrice';
  data.sort((a, b) =>
    a[sortBy] > b[sortBy] ? 1 : b[sortBy] > a[sortBy] ? -1 : 0
  );
  if (method === 'desc') {
    data = data.reverse();
  }

  data.forEach(
    (product) => (product.rating = product.rating === 0 ? null : product.rating)
  );

  return data;
};

const getOrderedProductData = (productData) => {
  const {
    productId: id,
    price,
    discountRate,
    Product: { name: productName, createdAt, ProductImage, ProductOption },
    SubCategory: { name: subCategory },
    City: { name: city },
  } = productData;

  productData['id'] = id;
  productData['price'] = price;
  productData['offerPrice'] = discountRate
    ? Math.round(price - price * discountRate)
    : price;
  productData['title'] = productName;
  if (createdAt) {
    productData['createdAt'] = createdAt;
  }
  const changedUrls =
    ProductImage.length !== 0
      ? ProductImage.map((el) => (el = el.imageUrl))
      : null;
  productData['imgUrl'] = changedUrls ? changedUrls[0] : null;
  productData['guranteedLowestPrice'] = false;
  productData['quickBooking'] = false;
  if (ProductOption.length !== 0)
    ProductOption.filter((el) => {
      if (el.OptionList.name === '최저가 보상제') {
        productData.guranteedLowestPrice = true;
      }
      if (el.OptionList.name === '즉시확정') {
        productData.quickBooking = true;
      }
    });
  productData['category'] = subCategory;
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

const getReviewWishData = async (productId, userId) => {
  const reviewData = await reviewService.getInitialReviewData(productId);
  let totalReviews, rating;
  if (!reviewData) {
    totalReviews = null;
    rating = null;
  } else {
    totalReviews = reviewData.overview.totalReviews;
    rating = reviewData.overview.ratingAvg;
  }

  let onUsersWishList;
  if (!userId) {
    onUsersWishList = false;
  } else {
    onUsersWishList = (await userService.isWishlistItem(userId, productId))
      ? true
      : false;
  }
  return { totalReviews, rating, onUsersWishList };
};

const getProductDetailInfoByProductId = async (productId) => {
  const convertedProductId = +productId;
  // if (Number.isNaN(convertedProductId)) {
  //   throw new BadRequestError(`Bad Request, id '${productId}' is not a number`);
  // }

  const productTypeData = await productDao.getProductTypeById(
    convertedProductId
  );
  if (!productTypeData) throw new NotFoundError('Not found product');

  const productTypeName = await productDao.getProductTypeNameById(
    productTypeData.productTypeId
  );

  let productDetailData = {};
  if (productTypeName === '투어') {
    productDetailData = await productDao.getTourDetailInfoByProductId(
      convertedProductId
    );
    const { price: standardPrice } = productDetailData;
    productDetailData['standardPrice'] = standardPrice;
    delete productDetailData.price;
  } else {
    productDetailData = await productDao.getTicketDetailInfoByProductId(
      convertedProductId
    );
    const { expireDate, TicketOption } = productDetailData;
    for (let option of TicketOption) {
      option['expireDate'] = expireDate;
    }
    productDetailData['TicketOption'] = TicketOption;
  }
  return productDetailData;
};

export default {
  getProductCardById,
  sortProductCardObjByCity,
  getProductsByClassId,
  getProductsByQuery,
  getWishCountByProductId,
  getProductDetailInfoByProductId,
};
