import * as mongoose from 'mongoose';
import { IUser } from '../types/IUser';

const Schema = mongoose.Schema;

export interface UserDocument extends mongoose.Document, IUser {
    _id: string,
    createdAt: Date,
    modifiedAt: Date
}

const UserSchema = new Schema({
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
},
    {
        timestamps: true
    });

export let UserModel = mongoose.model<UserDocument>('User', UserSchema);
