import mongoose, { PaginateModel } from "mongoose";
import { IUser } from "../types/user";
import { hashPassword } from "../utils/password";
import mongoosePaginate from 'mongoose-paginate-v2';
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

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
        select: false,
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
        },
        versionKey: false // from now the new entries in db will not have __v flag
    });

userSchema.pre('save', async function () {
    if (this.isModified('password')) {
        this.password = await hashPassword(this.password);
    }
    if (this.isModified('avatar')) {
        this.avatar = `/uploads/${this.avatar}`
    }
})

userSchema.virtual("avatar_url").get(function () {
    if (!this.avatar) {
        return null;
    }
    return `${process.env.BASE_URL}${this.avatar}`;
});

userSchema.set("toJSON", {
    virtuals: true,
});

userSchema.set("toObject", {
    virtuals: true,
});

userSchema.plugin(mongoosePaginate);
userSchema.plugin(mongooseAggregatePaginate);

export const User = mongoose.model<IUser, PaginateModel<IUser>>('User', userSchema);