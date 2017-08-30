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
        type: Date
    },
    value: {
        type: Number,
        required: true
    },
    report: {
        type: String,
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

export let DataModel = mongoose.model<DataDocument>('Data', DataSchema);
