import { Router } from 'express';
import { AuthController } from '../controller/Auth.controller';
import { validate } from '../middleware/validate.middleware';
import { registerSchema } from '../validators/auth.validator';

let authRouter = Router();

let authController = new AuthController();

authRouter.post('/register', validate(registerSchema), authController.register);
authRouter.post('/login', authController.login);

export default authRouter;
