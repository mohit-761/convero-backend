import { Request, response, Response } from "express";
import { UserService } from "../service/User.service";
import { requestHandler } from "../utils/requestHandler";
import { ApiResponse } from "../utils/ApiResponse";
import { AuthRequest } from "../types/req";

export class UserController {

    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    public getMe = requestHandler<AuthRequest>(async (req: AuthRequest, res: Response) => {
            let response = await this.userService.getMe(req.user);
            return res.status(200).send(new ApiResponse(response.statusCode, response.message, response.data))
    })

    public updateProfile = requestHandler<AuthRequest>(async (req: AuthRequest, res: Response) => {
        let response = await this.userService.updateProfile(req.user, req.body);
        return res.status(200).send(new ApiResponse(response.statusCode, response.message, response.data))
    })
}   