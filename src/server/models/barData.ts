import * as mongoose from 'mongoose';
import { IChartData } from '../types/IChartData';
const Schema = mongoose.Schema;

export interface BarDataDocument extends mongoose.Document, IChartData {
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
