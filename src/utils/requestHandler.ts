import { NextFunction, Request, Response } from "express";
import { asyncHandlerType } from "../types/req";

export function requestHandler<T extends Request = Request>(asyncHandler: asyncHandlerType<T>) {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(asyncHandler(req as T, res, next)).catch((err) => next(err));
    }
}