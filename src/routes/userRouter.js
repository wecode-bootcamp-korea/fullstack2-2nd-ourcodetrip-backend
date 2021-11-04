import express from 'express';
import { userController } from '../controllers';
import { authenticateJWT } from '../middlewares/passportJwt';

const userRouter = express.Router();

userRouter.get('/profile/', authenticateJWT, userController.getUserProfileById);
userRouter.patch(
  '/profile/',
  authenticateJWT,
  userController.updateUserProfile
);
userRouter.post('/auth/kakao', userController.authKakaoUser);
userRouter.get('/auth/kakao', userController.checkKakaoLinkUser);
userRouter.post('/auth/kakao/link', userController.handleKakaoLink);
// patch로 진행할 시에 json-parser에서 unexpected token 0 ~ 에러 발생

userRouter.post(
  '/wishlist/:productId',
  authenticateJWT,
  userController.addAndRemoveWishlist
);
userRouter.get(
  '/wishlist/',
  authenticateJWT,
  userController.getWishlistByUserId
);

// 상품 별 위시리스트 개수 가지고 오는 API 추가

export default userRouter;
