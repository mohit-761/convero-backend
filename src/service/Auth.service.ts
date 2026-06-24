import { User } from "../model/user.model";
import { ApiError } from "../utils/ApiError";
import { comparePassword, hashPassword } from "../utils/password";
import jwt, { SignOptions } from 'jsonwebtoken';
import { loginSchemaType, registerSchemaType } from "../validators/auth.validator";
import { OtpService } from "./Otp.service";
import { tokenPayloadType } from "../types/req";

export class AuthService {

    private otpService: OtpService;

    constructor() {
        this.otpService = new OtpService();
    }

    public async register(body: registerSchemaType) {

        let { name, email, password, otp } = body;

        let userExists = await User.findOne({ email: email });

        if (userExists) {
            throw new ApiError(400, 'email already exists.')
        };

        if (!otp) {

            let code = await this.otpService.generateOtp(email, 6);

            return { statusCode: 200, message: 'otp has been generate successfully.', data: { otp: code } }

        } else if(!await this.otpService.verifyOtp(email, otp)) throw new ApiError(400, 'invalid otp. please try again');

        // let hashedPassword = await hashPassword(password);

        let user = new User({
            name: name,
            password: password,
            email: email
        });

        await user.save();

        let payload = {
            _id: user._id.toString(),
            // name: user.name,
            // email: user.email,
        }

        let token = this.generateToken(payload);

        return {
            statusCode: 200,
            message: 'user has been registered successfully',
            data: {
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                },
                token: token
            }
        }
    }

    public generateToken(payload: tokenPayloadType) {

        let secret = process.env.SECRET;

        let expiresIn = process.env.EXPIRESIN;

        if (!secret) {
            throw new ApiError(404, 'SECRET is not defined');
        }

        if (!expiresIn) {
            throw new ApiError(404, 'expires in is not defined');
        }

        const options: SignOptions = {
            expiresIn: expiresIn as SignOptions['expiresIn'],
        };

        return jwt.sign(payload, secret, options);
    }

    public async login(body: loginSchemaType) {

        let { email, password } = body;

        let userExists = await User.findOne({ email: email });

        if (!userExists) {
            throw new ApiError(404, 'email does not exists')
        }

        if (!await comparePassword(password, userExists.password)) {
            throw new ApiError(404, 'invalid password please enter correct password');
        }

        let payload = {
            _id: userExists._id.toString(),
            // name: userExists.name,
            // email: userExists.email,
        }

        let token = this.generateToken(payload);

        return {
            user: {
                _id: userExists._id,
                name: userExists.name,
                email: userExists.email,
            },
            token: token
        }
    }
}