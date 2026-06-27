import { Router } from 'express';
import { authenticate } from '../middleware/authenticate.middleware';
import { UserController } from '../controller/User.controller';
import { validate } from '../middleware/validate.middleware';
import { userProfileValidator } from '../validators/user-profile.validator';
import { fileUpload } from '../middleware/file-upload.middleware';
import { requiredFile } from '../middleware/requiredFile.middleware';

let userRouter = Router();

let userController = new UserController();

userRouter.get('/me', authenticate, userController.getMe);
userRouter.put('/me', authenticate, validate(userProfileValidator), userController.updateProfile);
userRouter.put('/image', authenticate, fileUpload.single('file'), requiredFile, userController.updateProfileImage);

export default userRouter;