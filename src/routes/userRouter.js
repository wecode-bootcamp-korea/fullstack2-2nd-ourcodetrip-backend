import express from 'express';
import { userController } from '../controllers';

const userRouter = express.Router();

userRouter.get('/:userId', userController.getUserById);
userRouter.post('/auth/kakao', userController.authKakaoUser);

export default userRouter;
