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
    res.status(201).json({ message: 'success', data: token });
  } catch (err) {
    next(err);
  }
};

export default { getUserById, authKakaoUser };
