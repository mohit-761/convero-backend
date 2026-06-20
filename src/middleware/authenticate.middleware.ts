import { NextFunction, Response, Request } from 'express';
import jsonwebtoken from 'jsonwebtoken';
import { ApiError } from '../utils/ApiError';
import { UserData } from '../types/user';
import { AuthRequest } from '../types/req';

export function authenticate(req: Request, res: Response, next: NextFunction) {

    let secret = process.env.SECRET!;

    let headers = req.headers['authorization'];

    let token = headers?.split(' ')[1];

    if (!token) throw new ApiError(401, 'No authentication token provided. Please log in to continue.');

    try {

        let payload = jsonwebtoken.verify(token, secret);

        (req as AuthRequest).user = payload as UserData;

        next();

    } catch (err: any) {

        throw new ApiError(404, 'Your session has expired or is invalid. Please log in again.');

    }

}