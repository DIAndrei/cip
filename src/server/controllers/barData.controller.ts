import { Request, Response } from 'express';
import { BarDataModel as Data } from '../models/barData';

export class DataController {
    constructor() { }
    async getData(): Promise<Object[]> {
        return await Data.find().lean().exec() as Object[];
    }
    async postData(newData): Promise<void> {
        let data = new Data(newData);
        await data.save();
    }
}
