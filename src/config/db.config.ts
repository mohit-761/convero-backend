import './env.config';
import mongoose from 'mongoose';

export async function dbConnect() {
    try {
        let dbURL = process.env.MONGODB_URI || "";
        await mongoose.connect(dbURL);
        console.log('DATABASE CONNECTED SUCCESSFULLY');
    } catch (error: any) {
        console.log('ERROR IN DB CONNECTION', error.message);
    }
}