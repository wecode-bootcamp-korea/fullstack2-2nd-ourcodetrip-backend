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

const serviceCategoryInfo = {
  fileName: 'serviceCategory',
  model: prisma.serviceCategory,
  checkColumnName: 'name',
};

const userProfileImageInfo = {
  fileName: 'userProfileImage',
  model: prisma.userProfileImage,
  checkColumnName: 'imageUrl',
};

const inputInfos = [
  platformInfo,
  userInfo,
  serviceCategoryInfo,
  userProfileImageInfo,
];

export const uploadAllData = async () => {
  try {
    for (let info of inputInfos) {
      await uploadData(info);
    }
  } catch (err) {
    console.error(err);
  }
};
