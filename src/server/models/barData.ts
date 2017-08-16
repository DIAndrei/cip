import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export interface BarDataDocument extends mongoose.Document {
    _id: string,
    attr: string,
    value: number
}

const BarDataSchema = new Schema({
    attr: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true
    }
});

export var BarDataModel = mongoose.model<BarDataDocument>('BarData', BarDataSchema);
