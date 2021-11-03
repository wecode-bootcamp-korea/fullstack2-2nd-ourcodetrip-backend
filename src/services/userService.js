import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { userDao } from '../models';
import { productService } from '../services';
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from '../utils/errors';

dotenv.config(); // config 디렉토리에 한번만 사용할 수 있도록 리팩토링

const getUserProfileById = async (userId) => {
  const parsedUserId = parseInt(userId);
  if (isNaN(parsedUserId)) {
    throw new BadRequestError(`Bad Request, id '${userId}' is not a number`);
  }

  const userProfile = await userDao.getUserProfileById(parsedUserId);
  if (!userProfile) throw new NotFoundError('Not found user');

  // 하단 코드 리팩토링 필요, 특정 객체의 프로퍼티를 새로운 키 값으로 옮겨주는 코드
  const { userProfileImage } = userProfile;
  const profileImageUrl = userProfileImage[0].imageUrl;
  delete userProfile.userProfileImage;
  userProfile['profileImageUrl'] = profileImageUrl;

  return userProfile;
};

const updateUserProfile = async (userId, updateData) => {
  const parsedUserId = parseInt(userId);
  if (isNaN(parsedUserId)) {
    throw new BadRequestError(`Bad Request, id '${userId}' is not a number`);
  }

  const userProfile = await userDao.updateUserProfile(userId, updateData);
  return userProfile;
};

const authKakaoUser = async (user) => {
  const { email } = user;
  const userProfile = await userDao.getUserProfileByEmail(email);
  let userId;
  if (!userProfile) {
    const { id } = await userDao.createKakaoUser(user);
    userId = id;
  } else {
    userId = userProfile.id;
  }
  const token = await generateJwt(userId);
  return token;
};

const generateJwt = async (userId) => {
  const secretOrKey = process.env.JWT_SECRET;
  let token = jwt.sign({ id: userId }, secretOrKey, { expiresIn: '2h' });
  return token;
};

const checkKakaoLinkUser = async (email) => {
  const userProfile = await userDao.getUserProfileByEmail(email);
  if (!userProfile) throw new NotFoundError('Not found user');

  const kakaoPlatformId = await userDao.getPlatformIdByName('kakao');
  if (userProfile.platformId !== kakaoPlatformId) {
    throw new UnauthorizedError({
      message: `Unauthorized Access, ${email} user is not linked with kakao`,
      kakaoLinked: false,
    });
  }
  return { kakaoLinked: true };
};

const setKakaoLink = async (email) => {
  const userProfile = await userDao.getUserProfileByEmail(email);
  if (!userProfile) throw new NotFoundError('Not found user');

  const kakaoPlatformId = await userDao.getPlatformIdByName('kakao');
  return await userDao.setKakaoLink(email, kakaoPlatformId);
};

const unsetKakaoLink = async (email) => {
  const userProfile = await userDao.getUserProfileByEmail(email);
  if (!userProfile) throw new NotFoundError('Not found user');

  const localPlatformId = await userDao.getPlatformIdByName('local');
  return await userDao.unsetKakaoLink(email, localPlatformId);
};

const isWishlistItem = async (userId, productId) => {
  const items = await userDao.getWishlistByUserId(userId);
  for (let item of items) {
    if (item.productId === productId) {
      return item;
    }
  }
  return null;
};

const addAndRemoveWishlist = async (userId, productId) => {
  const parsedProductId = parseInt(productId);
  if (isNaN(parsedProductId))
    throw new BadRequestError(
      `Bad Request, productId '${productId}' is not a number`
    );
  if (!(await productService.getProductCardById(parsedProductId)))
    throw new NotFoundError('Not found product');

  const wishlistItem = await isWishlistItem(userId, parsedProductId);
  let isWishlist;
  if (wishlistItem) {
    const { id: wishlistId } = wishlistItem;
    await userDao.removeWishlist(wishlistId);
    isWishlist = false;
  } else {
    await userDao.addWishlist(userId, parsedProductId);
    isWishlist = true;
  }
  return isWishlist;
};

const getWishlistByUserId = async (userId) => {
  const wishilistData = await userDao.getWishlistByUserId(userId);
  const productList = [];
  for (let data of wishilistData) {
    const { productId } = data;
    const product = await productService.getProductCardById(productId);
    productList.push(product);
  }
  const sortedProductObj = productService.sortProductCardObjByCity(productList);
  return sortedProductObj;
};

export default {
  getUserProfileById,
  updateUserProfile,
  authKakaoUser,
  checkKakaoLinkUser,
  setKakaoLink,
  unsetKakaoLink,
  isWishlistItem,
  addAndRemoveWishlist,
  getWishlistByUserId,
};
