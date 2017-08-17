import * as mongoose from 'mongoose';
import { IChartData } from '../types/IChartData';
const Schema = mongoose.Schema;

export interface DataDocument extends mongoose.Document, IChartData {
    _id: string
}

const DataSchema = new Schema({
    prop: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    value: {
        type: Number,
        required: true
    }
});

export var DataModel = mongoose.model<DataDocument>('Data', DataSchema);
