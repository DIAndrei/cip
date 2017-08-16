import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export interface DataDocument extends mongoose.Document {
    _id: string,
    date: Date,
    value: number
}

const DataSchema = new Schema({
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
