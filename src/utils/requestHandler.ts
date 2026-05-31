import { NextFunction, Request, Response } from "express";
import { asyncHandlerType } from "../types/req";

export function requestHandler(asyncHandler: asyncHandlerType){
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(asyncHandler(req, res, next)).catch((err) => next(err));
    }
}