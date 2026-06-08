import mongoose from "mongoose";
import { IUser } from "../types/user";

const userSchema = new mongoose.Schema<IUser>({
    name: {
        type: String,
        minLength: [3, 'name must have atleast 3 characters'],
        maxLength: [50, 'name cannot have more than 50 characters'],
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    avatar: {
        type: String,
        required: false,
        default: null,
    }
},
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        }
    });

export const User = mongoose.model<IUser>('User', userSchema);