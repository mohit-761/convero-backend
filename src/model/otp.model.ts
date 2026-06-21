import mongoose from "mongoose";
import { IOTP } from "../types/otp";

export const OTPSchema = new mongoose.Schema<IOTP>({
    otp: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 6,
    },
    expiry: {
        type: Date,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        required: true,
    }
},
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    });

export const Code = mongoose.model<IOTP>('Code', OTPSchema);