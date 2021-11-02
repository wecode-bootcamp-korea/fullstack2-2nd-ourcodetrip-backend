import express from 'express';
import { userController } from '../controllers';
import { authenticateJWT } from '../passport';

const userRouter = express.Router();

userRouter.get('/profile/:userId', userController.getUserById);
userRouter.post('/auth/kakao', userController.authKakaoUser);
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

export default userRouter;
