import { Document, Types } from "mongoose";

export interface IOTP extends Document {
    _id: Types.ObjectId,
    otp: string,
    email: string;
    expiry: Date,
    created_at: Date,
    updated_at: Date,
}