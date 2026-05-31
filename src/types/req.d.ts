import { NextFunction, Request, Response } from "express";

export type asyncHandlerType = (req: Request, res: Response, next: NextFunction) => Promise<any> | void;

export type UserData = {
    id: number;
    name: string;
    avatar: string;
    avatar_url: string;
    email: string;
    created_at: Date;
    updated_at: Date;
}

export interface AuthRequest extends Request {
    user: UserData;
}