import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";

export function errorHandler(err: Error | ApiError, req: Request, res: Response, next: NextFunction) {
    let message = err.message;
    let status = 500;
    let data: any = null;
    if (err instanceof ApiError) {
        status = err.statusCode;
        data = err.data;
    }
    return res.status(status).json(new ApiResponse(status, message, data))
}