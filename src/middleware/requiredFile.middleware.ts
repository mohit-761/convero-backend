import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/ApiError";

export function requiredFile(req: Request, res: Response, next: NextFunction) {
    if (!req.file) {
        return next(new ApiError(400, 'file is required'));
    }
    next();
}