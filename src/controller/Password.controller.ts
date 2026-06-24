import { Response } from "express";
import { PasswordService } from "../service/Password.service";
import { AuthRequest } from "../types/req";
import { requestHandler } from "../utils/requestHandler";
import { ApiResponse } from "../utils/ApiResponse";

export class PasswordController {

    private passwordService: PasswordService;

    constructor() {
        this.passwordService = new PasswordService();
    }

    public changePassword = requestHandler(async (req: AuthRequest, res: Response) => {
        let response = await this.passwordService.changePassword(req.user, req.body);
        return res.status(response.statusCode).send(new ApiResponse(response.statusCode, response.message));
    });

    public forgotPassword = requestHandler(async (req: AuthRequest, res: Response) => {
        let response = await this.passwordService.forgotPassword(req.body);
        return res.status(response.statusCode).send(new ApiResponse(response.statusCode, response.message, response?.data));
    });

}