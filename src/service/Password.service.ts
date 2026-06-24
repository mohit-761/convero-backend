import { User } from "../model/user.model";
import { UserData } from "../types/user";
import { ApiError } from "../utils/ApiError";
import { forgotPasswordSchemaType, resetPasswordSchemaType } from "../validators/password.validator";
import { OtpService } from "./Otp.service";
import { UserService } from "./User.service";

export class PasswordService {

    private userService: UserService;
    private otpService: OtpService;

    constructor() {
        this.userService = new UserService();
        this.otpService = new OtpService();
    }


    public async changePassword(user: UserData, body: resetPasswordSchemaType) {

        let { password } = body;

        let userExists = await this.userService.findOne(user);

        userExists.password = password;

        await userExists.save();

        return { statusCode: 200, message: 'password have been changed successfully.' }

    }


    public async forgotPassword(body: forgotPasswordSchemaType) {

        let { email, password, otp } = body;

        let userExists = await User.findOne({ email: email });

        if (!userExists) throw new ApiError(404, 'user could not be found. please enter correct email address');

        if (!otp) {

            let code = await this.otpService.generateOtp(email, 6);

            return { statusCode: 200, message: 'otp has been generated', data: { otp: code } };

        } else if (!await this.otpService.verifyOtp(email, otp)) {

            throw new ApiError(400, 'please enter a valid otp');

        }

        // NOTE:-
        // here we can compare the old password with this new one
        // if both are same we can simply return error like
        // enter new password or old and new password cannot be same

        userExists.password = password;

        await userExists.save();

        return { statusCode: 200, message: 'password have been rest successfully' };

    };


}