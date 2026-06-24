import mongoose from "mongoose";
import { IUser } from "../types/user";
import { hashPassword } from "../utils/password";

const userSchema = new mongoose.Schema<IUser>({
    name: {
        type: String,
        minLength: 3,
        maxLength: 50,
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

userSchema.pre('save', async function () {
    if (this.isModified('password')) {
        console.log('within if');
        this.password = await hashPassword(this.password);
    }
    console.log('in pre middleware');
})

export const User = mongoose.model<IUser>('User', userSchema);