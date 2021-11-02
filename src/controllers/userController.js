import { BadRequestError, UnauthorizedError } from '../utils/errors';
import { userService } from '../services';
import fetch from 'node-fetch';

const getUserById = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const userInfo = await userService.getUserById(userId);
    res.status(200).json({ message: 'success', data: userInfo });
  } catch (err) {
    next(err);
  }
};

const authKakaoUser = async (req, res, next) => {
  try {
    const bearer = req.get('Authorization');
    if (!bearer) throw new UnauthorizedError();
    const response = await fetch('https://kapi.kakao.com/v2/user/me', {
      method: 'GET',
      headers: {
        Authorization: bearer,
        'Content-Type': 'application/json',
      },
    });
    const jsonData = await response.json();
    const { kakao_account } = jsonData;
    if (!kakao_account) throw new UnauthorizedError();
    const {
      email,
      profile: { nickname: name, profile_image_url: profileImageUrl },
    } = kakao_account;
    const user = { email, name, profileImageUrl };
    const token = await userService.authKakaoUser(user);
    res.status(201).json({ message: 'created', data: token });
  } catch (err) {
    next(err);
  }
};

const addAndRemoveWishlist = async (req, res, next) => {
  try {
    const userId = req.userId;
    if (!userId) throw new UnauthorizedError();
    const { productId } = req.params;

    const isWishlist = await userService.addAndRemoveWishlist(
      userId,
      productId
    );
    res.status(201).json({ message: 'created', data: isWishlist });
  } catch (err) {
    next(err);
  }
};

const getWishlistByUserId = async (req, res, next) => {
  const userId = req.userId;
  if (!userId) throw new UnauthorizedError();

  const wishilist = await userService.getWishlistByUserId(userId);
  res.status(200).json({ message: 'success', data: wishilist });
};

export default {
  getUserById,
  authKakaoUser,
  addAndRemoveWishlist,
  getWishlistByUserId,
};
