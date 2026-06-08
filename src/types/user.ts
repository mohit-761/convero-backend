import { Document, Types } from "mongoose";

export interface IUser extends Document {
    id: Types.ObjectId,
    name: string,
    email: string,
    password: string,
    avatar?: string,
    created_at: Date,
    updated_at: Date,
}

export type UserData = Pick<IUser, 'name' | 'email' | 'avatar'> & {
    id: string;
}