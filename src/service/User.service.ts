import { User } from "../model/user.model";
import { UserData } from "../types/user";
import { ApiError } from "../utils/ApiError";

export class UserService {

    async getMe(user: UserData){

        let userExists = await User.findOne({ id: user._id }).select('-password -__v').lean();

        if(!userExists) throw new ApiError(404, 'user does not exists');

        return userExists;

    }

}