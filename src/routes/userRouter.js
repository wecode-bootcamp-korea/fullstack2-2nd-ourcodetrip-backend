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
userRouter.patch('/auth/kakao', userController.handleKakaoLink);

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
