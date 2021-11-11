import { userService } from '../services';
import { UnauthorizedError } from '../utils/errors';
import fetch from 'node-fetch';

const getUserProfileById = async (req, res, next) => {
  try {
    const userId = req.userId;
    if (!userId) throw new UnauthorizedError();

    const userProfile = await userService.getUserProfileById(userId);
    res.status(200).json({ message: 'success', data: userProfile });
  } catch (err) {
    next(err);
  }
};

const updateUserProfile = async (req, res, next) => {
  try {
    const userId = req.userId;
    if (!userId) throw new UnauthorizedError();

    const updateData = req.body;
    const userProfile = await userService.updateUserProfile(userId, updateData);
    res.status(200).json({ message: 'updated', data: userProfile });
  } catch (err) {
    next(err);
  }
};

const authKakaoUser = async (req, res, next) => {
  try {
    const kakaoAccessToken = req.get('Authorization');
    if (!kakaoAccessToken) throw new UnauthorizedError();

    const kakaoAccount = await getKakaoAccountInfo(kakaoAccessToken);
    const {
      email,
      profile: { nickname: name, profile_image_url: profileImageUrl },
    } = kakaoAccount;
    const user = { email, name, profileImageUrl };
    const token = await userService.authKakaoUser(user);
    res.status(201).json({ message: 'created', data: token });
  } catch (err) {
    next(err);
  }
};

const checkKakaoLinkUser = async (req, res, next) => {
  try {
    const kakaoAccessToken = req.get('Authorization');
    if (!kakaoAccessToken) throw new UnauthorizedError();

    const kakaoAccount = await getKakaoAccountInfo(kakaoAccessToken);
    const { email } = kakaoAccount;
    const result = await userService.checkKakaoLinkUser(email);
    res.status(200).json({ message: 'success', data: result });
  } catch (err) {
    next(err);
  }
};

const handleKakaoLink = async (req, res, next) => {
  try {
    const kakaoAccessToken = req.get('Authorization');
    if (!kakaoAccessToken) throw new UnauthorizedError();

    const kakaoAccount = await getKakaoAccountInfo(kakaoAccessToken);
    const { email } = kakaoAccount;
    const { isKakaoLinked } = req.body;

    let resultData;
    if (isKakaoLinked) {
      resultData = await userService.setKakaoLink(email);
    } else {
      const disconnectKakaoId = await disconnectKakaoLink(kakaoAccessToken);
      if (!disconnectKakaoId)
        throw new UnauthorizedError(
          'Unauthorized Access, kakao disconnect failed'
        );
      resultData = await userService.unsetKakaoLink(email);
    }
    res.status(200).json({ message: 'updated', data: resultData });
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
    if (isWishlist) {
      res.status(201).json({ message: 'created', data: isWishlist });
    } else {
      res.status(200).json({ message: 'deleted', data: isWishlist });
    }
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

const getKakaoAccountInfo = async (kakaoAccessToken) => {
  const response = await fetch('https://kapi.kakao.com/v2/user/me', {
    method: 'GET',
    headers: {
      Authorization: kakaoAccessToken,
      'Content-Type': 'application/json',
    },
  });
  const jsonData = await response.json();
  const { kakao_account } = jsonData;
  if (!kakao_account)
    throw new UnauthorizedError('Unauthorized user, kakao token is invalid');

  return kakao_account;
};

const disconnectKakaoLink = async (kakaoAccessToken) => {
  const response = await fetch('https://kapi.kakao.com/v1/user/unlink', {
    method: 'POST',
    headers: {
      Authorization: kakaoAccessToken,
      'Content-Type': 'application/json',
    },
  });
  const jsonData = await response.json();
  const { id } = jsonData;
  return id;
};

export default {
  getUserProfileById,
  updateUserProfile,
  authKakaoUser,
  checkKakaoLinkUser,
  handleKakaoLink,
  addAndRemoveWishlist,
  getWishlistByUserId,
};
