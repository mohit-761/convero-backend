import { NextFunction, Request, Response } from "express";
import { UserData } from "./user";

export type asyncHandlerType<T extends Request = Request> =
    (req: T, res: Response, next: NextFunction)
        => Promise<any> | void;

export interface AuthRequest extends Request {
    user: UserData;
}

export type tokenPayloadType = { _id: string };