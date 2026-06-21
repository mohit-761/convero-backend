import { User } from "../model/user.model";
import { UserData } from "../types/user";
import { ApiError } from "../utils/ApiError";
import { userProfileValidatorType } from "../validators/user-profile.validator";
import { AuthService } from "./Auth.service";
import { OtpService } from "./Otp.service";

export class UserService {

    private otpService: OtpService;
    private authService: AuthService;

    constructor() {
        this.otpService = new OtpService();
        this.authService = new AuthService();
    }

    async getMe(user: UserData) {

        let userExists = await User.findOne({ id: user._id }).select('-password -__v').lean();

        if (!userExists) throw new ApiError(404, 'user does not exists');

        return userExists;
    }

    // update profile 
    async updateProfile(user: UserData, body: userProfileValidatorType) {

        let { name, email, otp } = body;

        let userExists = await this.getMe(user);

        if (email && email != userExists.email) {

            if (!otp) {

                let code = await this.otpService.generateOtp(email, 6);

                return { statusCode: 200, message: 'otp generated successfully', data: { otp: code } }

            } else if (!await this.otpService.verifyOtp(email, otp)) {

                throw new ApiError(400, 'invalid otp. please try again later');

            }

            user.email = email || user.email;

        }

        user.name = name || user.name;

        await userExists.save();

        let payload = {
            _id: userExists._id.toString(),
            name: userExists.name,
            email: userExists.email,
        }

        let token = this.authService.generateToken(payload);

        return {
            statusCode: 200,
            message: 'profile has been updated successfully',
            data: {
                user: userExists,
                token: token,
            }
        };

    }


    // update image
    // async updateProfileImage(user: UserData, file: Express.Multer.File){

    //     let userExists = await this.getMe(user);

    //     userExists.avatar = file.filename;

    //     await userExists.save();

    //     return userExists;

    // }

}