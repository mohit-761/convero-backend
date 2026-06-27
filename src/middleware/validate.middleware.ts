import { NextFunction, Request, Response } from "express";
import * as z from "zod";
import { ApiError } from "../utils/ApiError";
import { formatZodErrors } from "../utils/formatZodErrors.ts";

export const validate = (schema: z.ZodType) =>

    (req: Request, res: Response, next: NextFunction) => {

        if (!req.body) {
            // throw new ApiError(
            //     400,
            //     'please enter the required values'
            // )
            req.body = {};
        }

        const result = schema.safeParse(req.body);

        if (!result.success) {
            // formate the erorrs
            const errors = formatZodErrors(result.error);

            return next(
                new ApiError(
                    422,
                    'validation failed',
                    errors
                )
            )
        }

        req.body = result.data;

        next();

    }