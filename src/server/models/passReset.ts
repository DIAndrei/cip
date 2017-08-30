import * as mongoose from 'mongoose';
import { IPassReset } from '../types/IPassReset';

const Schema = mongoose.Schema;

export interface PassResetDocument extends mongoose.Document, IPassReset {
    _id: string
}

const PassResetSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        expires: '24h',
        default: Date.now
    }
});

export let PassResetModel = mongoose.model<PassResetDocument>('PassReset', PassResetSchema);
