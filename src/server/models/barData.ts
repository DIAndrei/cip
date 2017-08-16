import * as mongoose from 'mongoose';
import { IBarData } from '../types/IBarData';
const Schema = mongoose.Schema;

export interface BarDataDocument extends mongoose.Document, IBarData {
    _id: string
}

const BarDataSchema = new Schema({
    prop: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true
    }
});

export var BarDataModel = mongoose.model<BarDataDocument>('BarData', BarDataSchema);
