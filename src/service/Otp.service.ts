import { DateTime } from 'luxon';
import { Code } from '../model/otp.model';
import { ApiError } from '../utils/ApiError';

export class OtpService {


    async generateOtp(email: string, length: number, type: string = 'numeric') {

        let otpString = type == 'alphanumeric'
            ? '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz' : '0123456789';

        let otp = '';

        for (let i = 0; i < length; i++) {
            otp += otpString.charAt(Math.floor(Math.random() * length));
        }

        let expiry = DateTime
            .now().plus({ 'minutes': 3 })
            .toJSDate();

        let code = new Code({
            otp: otp,
            email: email,
            expiry: expiry
        });

        await code.save();

        return otp;

    }

    async verifyOtp(email: string, code: string): Promise<Boolean> {

        let codeExists = await Code.findOne({ email: email, otp: code });

        if (!codeExists) throw new ApiError(400, 'Invalid OTP. Please try again.');

        let expiresAt = DateTime.fromJSDate(codeExists.expiry);

        if (expiresAt < DateTime.now())
            throw new ApiError(400, 'OTP has been expired. Please try again.')

        if (codeExists.otp != code)
            throw new ApiError(400, 'Invalid OTP. Please try again.')

        await Code.deleteOne({ _id: codeExists._id })

        return true;

    }
}