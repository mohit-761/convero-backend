import { NextFunction, Response } from 'express';
import jsonwebtoken from 'jsonwebtoken';
import { ApiError } from '../utils/ApiError';
import { AuthRequest, UserData } from '../types/req';

export function authenticate(req: AuthRequest, res: Response, next: NextFunction) {

    let secret = process.env.SECRET;

    if (!secret) throw new ApiError(400, 'secret cannot be empty');

    let headers = req.headers['authorization'];

    if (!headers) throw new ApiError(404, 'invalid request header');

    let token = headers.split(' ')[1];

    if (!token) throw new ApiError(404, 'please provide a token');

    try {

        let payload = jsonwebtoken.verify(token, secret);

        req.user = payload as UserData;

        next();

    } catch (err: any) {

        throw new ApiError(404, err.message)

    }

}