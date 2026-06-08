import { Router } from 'express';
import { AuthController } from '../controller/Auth.controller';

let authRouter = Router();

let authController = new AuthController();

authRouter.post('/register', authController.register);
authRouter.post('/login', authController.login);

export default authRouter;
