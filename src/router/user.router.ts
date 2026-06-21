import { Router } from 'express';
import { authenticate } from '../middleware/authenticate.middleware';
import { UserController } from '../controller/User.controller';

let userRouter = Router();

let userController = new UserController();

userRouter.get('/me', authenticate, userController.getMe);
userRouter.put('/me', authenticate, userController.updateProfile);

export default userRouter;