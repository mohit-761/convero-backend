import { Router } from 'express';
import { PasswordController } from '../controller/Password.controller';
import { validate } from '../middleware/validate.middleware';
import { authenticate } from '../middleware/authenticate.middleware';
import { forgotPasswordSchema, changePasswordSchema } from '../validators/password.validator';

let passwordRouter = Router();

let passwordController = new PasswordController();

passwordRouter.put('/change', authenticate, validate(changePasswordSchema), passwordController.changePassword);
passwordRouter.post('/forgot', validate(forgotPasswordSchema), passwordController.forgotPassword);

export default passwordRouter;