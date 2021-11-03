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

const TicketOptionInfo = {
  fileName: 'ticketOption',
  model: prisma.ticketOption,
  checkColumnName: '',
};

const classificationInfo = {
  fileName: 'classification',
  model: prisma.classification,
  checkColumnName: 'name',
};

const classificationProduct = {
  fileName: 'classificationProduct',
  model: prisma.classificationProduct,
  checkColumnName: '',
};

const inputInfos = [];

export const uploadAllData = async () => {
  try {
    for (let info of inputInfos) {
      await uploadData(info);
    }
  } catch (err) {
    console.error(err);
  }
};
