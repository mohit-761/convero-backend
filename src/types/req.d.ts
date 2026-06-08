import { NextFunction, Request, Response } from "express";
import { UserData } from "./user";

export type asyncHandlerType = (req: Request, res: Response, next: NextFunction) => Promise<any> | void;

export interface AuthRequest extends Request {
    user: UserData;
}