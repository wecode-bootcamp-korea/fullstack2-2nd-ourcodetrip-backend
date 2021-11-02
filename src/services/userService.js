import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { userDao } from '../models';
import { BadRequestError, NotFoundError } from '../utils/errors';

dotenv.config(); // config 디렉토리에 한번만 사용할 수 있도록 리팩토링

const getUserById = async (userId) => {
  const parsedUserId = parseInt(userId);
  if (isNaN(parsedUserId)) {
    throw new BadRequestError(`Bad Request, id '${userId}' is not a number`);
  }

  const userInfo = await userDao.getUserById(parsedUserId);
  if (!userInfo) throw new NotFoundError();

  // 하단 코드 리팩토링 필요, 특정 객체의 프로퍼티를 새로운 키 값으로 옮겨주는 코드
  const { userProfileImage } = userInfo;
  const profileImageUrl = userProfileImage[0].imageUrl;
  delete userInfo.userProfileImage;
  userInfo['profileImageUrl'] = profileImageUrl;

  return userInfo;
};

const authKakaoUser = async (user) => {
  const { email } = user;
  const userInfo = await userDao.getUserByEmail(email);
  let userId;
  if (!userInfo) {
    const { id } = await userDao.createKakaoUser(user);
    userId = id;
  } else {
    userId = userInfo.id;
  }
  const token = await generateJwt(userId);
  return token;
};

const generateJwt = async (userId) => {
  const secretOrKey = process.env.JWT_SECRET;
  let token = jwt.sign({ id: userId }, secretOrKey, { expiresIn: '2h' });
  return token;
};

export default { getUserById, authKakaoUser };
