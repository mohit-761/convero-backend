import { User } from "../model/user.model";
import { ApiError } from "../utils/ApiError";
import { comparePassword, hashPassword } from "../utils/password";
import jwt, { SignOptions } from 'jsonwebtoken';

export class AuthService {

    public async register(body: { name: string, email: string, password: string }) {

        let { name, email, password } = body;

        let userExists = await User.findOne({ email: email });

        if (userExists) {
            throw new ApiError(400, 'email already exists.')
        };

        let hashedPassword = await hashPassword(password);

        let user = new User({
            name: name,
            password: hashedPassword,
            email: email
        });

        await user.save();

        let payload = {
            _id: user._id.toString(),
            name: user.name,
            email: user.email,
        }

        let token = this.generateToken(payload);

        return {
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
            },
            token: token
        }
    }

    public generateToken(payload: { _id: string, name: string, email: string, avatar?: string }) {

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

    public async login(body: { email: string, password: string }) {

        let { email, password } = body;

        let userExists = await User.findOne({ email: email });

        if (!userExists) {
            throw new ApiError(404, 'email does not exists')
        }

        if (!comparePassword(password, userExists.password)) {
            throw new ApiError(404, 'invalid password please enter correct password');
        }

        let payload = {
            _id: userExists._id.toString(),
            name: userExists.name,
            email: userExists.email,
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