import { User } from "../model/user.model";
import { UserData } from "../types/user";
import { ApiError } from "../utils/ApiError";
import { filterParamsSchemaType } from "../validators/filter-params.validator";
import { userProfileValidatorType } from "../validators/user-profile.validator";
import { AuthService } from "./Auth.service";
import { OtpService } from "./Otp.service";
import fs from "fs/promises";
import path from 'path';

export class UserService {

    private otpService: OtpService;
    private authService: AuthService;

    constructor() {
        this.otpService = new OtpService();
        this.authService = new AuthService();
    }

    async findOne(user: UserData) {

        let userExists = await User.findOne({ _id: user._id }).select("+password");

        if (!userExists) throw new ApiError(404, 'user does not exists');

        return userExists;

    }

    async getMe(user: UserData) {

        let userExists = await User.findOne({ _id: user._id }).select('-password -__v');

        if (!userExists) throw new ApiError(404, 'user does not exists');

        return {
            statusCode: 200,
            message: 'user has been found',
            data: { user: userExists },
        };
    }

    // update profile 
    async updateProfile(user: UserData, body: userProfileValidatorType) {

        let { name, email, otp } = body;

        let userExists = await User.findOne({ _id: user._id });

        if (!userExists) throw new ApiError(404, 'user does not exists');

        if (email && email != userExists.email) {

            if (!otp) {

                let code = await this.otpService.generateOtp(email, 6);

                return { statusCode: 200, message: 'otp generated successfully', data: { otp: code } }

            } else if (!await this.otpService.verifyOtp(email, otp)) {

                throw new ApiError(400, 'invalid otp. please try again later');

            }

            userExists.email = email || userExists.email;

        }

        userExists.name = name || userExists.name;

        await userExists.save();

        return {
            statusCode: 200,
            message: 'profile has been updated successfully',
            data: { user: userExists }
        };

    }


    // update image
    async updateProfileImage(user: UserData, file: Express.Multer.File) {

        let userExists = await User.findOne({ _id: user._id });

        if (!userExists) throw new ApiError(404, 'user does not exists');

        if (userExists.avatar) {
            await fs.unlink(path.join(process.cwd(), userExists.avatar))
        }

        userExists.avatar = file.filename;

        await userExists.save();

        return {
            statusCode: 200,
            message: 'image has been updated',
            data: { user: userExists }
        };

    }

    async getAllUsers(user: UserData, query: filterParamsSchemaType) {

        let { page = 1, limit = 10, search = '' } = query;

        let users = await User.paginate({
            ...(search &&
                { name: { $regex: search, $options: "i" } })
        }, { page: page, limit: limit, sort: { created_at: -1 } });

        return {
            statusCode: 200,
            message: 'user have been found',
            data: users
        }

    }

}