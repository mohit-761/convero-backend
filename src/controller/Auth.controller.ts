import { Request, Response } from "express";
import { AuthService } from "../service/Auth.service";
import { requestHandler } from "../utils/requestHandler";
import { ApiResponse } from "../utils/ApiResponse";

export class AuthController {

    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    public register = requestHandler(async (req: Request, res: Response) => {
            let response = await this.authService.register(req.body);
            return res.status(200).send(new ApiResponse(200, 'user has been registered', response));
    });

    public login = requestHandler(async (req: Request, res: Response) => {
        let response = await this.authService.login(req.body);
        return res.status(200).send(new ApiResponse(200, 'user has been logged in', response));
    });
}