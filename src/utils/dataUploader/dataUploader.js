import prisma from '../../../prisma';
import { readFile } from './dataReader';
import { inputData } from './dataWriter';

const uploadData = async (inputInfo) => {
  const { fileName, model, checkColumnName } = inputInfo;
  const readData = await readFile(fileName);
  await inputData(model, checkColumnName, readData, fileName);
};

const platformInfo = {
  fileName: 'platform',
  model: prisma.platform,
  checkColumnName: 'name',
};

const userInfo = {
  fileName: 'user',
  model: prisma.user,
  checkColumnName: 'email',
};

const userProfileImageInfo = {
  fileName: 'userProfileImage',
  model: prisma.userProfileImage,
  checkColumnName: 'imageUrl',
};

const serviceCategoryInfo = {
  fileName: 'serviceCategory',
  model: prisma.serviceCategory,
  checkColumnName: 'name',
};

const mainCategoryInfo = {
  fileName: 'mainCategory',
  model: prisma.mainCategory,
  checkColumnName: 'name',
};

const subCategoryInfo = {
  fileName: 'subCategory',
  model: prisma.subCategory,
  checkColumnName: 'name',
};

const countryInfo = {
  fileName: 'country',
  model: prisma.country,
  checkColumnName: 'name',
};

const cityInfo = {
  fileName: 'city',
  model: prisma.city,
  checkColumnName: 'name',
};

const cityImageInfo = {
  fileName: 'cityImage',
  model: prisma.cityImage,
  checkColumnName: 'imageUrl',
};

const productTypeInfo = {
  fileName: 'productType',
  model: prisma.productType,
  checkColumnName: 'name',
};

const productInfo = {
  fileName: 'product',
  model: prisma.product,
  checkColumnName: 'name',
};

const optionListInfo = {
  fileName: 'optionList',
  model: prisma.optionList,
  checkColumnName: 'name',
};

const productOptionInfo = {
  fileName: 'productOption',
  model: prisma.productOption,
  checkColumnName: '',
};

const imageTypeInfo = {
  fileName: 'imageType',
  model: prisma.imageType,
  checkColumnName: 'name',
};

const productImageInfo = {
  fileName: 'productImage',
  model: prisma.productImage,
  checkColumnName: 'imageUrl',
};

const partnerInfo = {
  fileName: 'partner',
  model: prisma.partner,
  checkColumnName: 'name',
};

const tourInfo = {
  fileName: 'tour',
  model: prisma.tour,
  checkColumnName: '',
};

const ticketInfo = {
  fileName: 'ticket',
  model: prisma.ticket,
  checkColumnName: '',
};

const ticketOptionInfo = {
  fileName: 'ticketOption',
  model: prisma.ticketOption,
  checkColumnName: '',
};

const classificationInfo = {
  fileName: 'classification',
  model: prisma.classification,
  checkColumnName: 'name',
};

const classificationProductInfo = {
  fileName: 'classificationProduct',
  model: prisma.classificationProduct,
  checkColumnName: '',
};

const wishlistInfo = {
  fileName: 'wishlist',
  model: prisma.wishlist,
  checkColumnName: '',
};

const paymentTypeInfo = {
  fileName: 'paymentType',
  model: prisma.paymentType,
  checkColumnName: 'name',
};

const reservationInfo = {
  fileName: 'reservation',
  model: prisma.reservation,
  checkColumnName: '',
};

const reservationTourInfo = {
  fileName: 'reservationTour',
  model: prisma.reservationTour,
  checkColumnName: '',
};

const reservationTicketInfo = {
  fileName: 'reservationTicket',
  model: prisma.reservationTicket,
  checkColumnName: '',
};

const reviewInfo = {
  fileName: 'review',
  model: prisma.review,
  checkColumnName: '',
};

const reviewImageInfo = {
  fileName: 'reviewImage',
  model: prisma.reviewImage,
  checkColumnName: '',
};

const inputInfos = [];

/*
  캐러셀 테스트 데이터 세트
  classificationInfo,
  optionListInfo,
  imageTypeInfo,
  platformInfo,
  serviceCategoryInfo,
  mainCategoryInfo,
  subCategoryInfo,
  countryInfo,
  cityInfo,
  productTypeInfo,
  userInfo,
  partnerInfo,
  productInfo,
  productImageInfo,
  productOptionInfo,
  classificationProductInfo,
  tourInfo,
  paymentTypeInfo,
  reservationInfo,
  reviewInfo,
  reviewImageInfo,
*/
export const uploadAllData = async () => {
  try {
    for (let info of inputInfos) {
      await uploadData(info);
    }
  } catch (err) {
    console.error(err);
  }
};
