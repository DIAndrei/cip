import { Request, Response } from 'express';
import { DataModel as Data } from '../models/lineData';
import { ILineData } from '../types/ILineData';

export class DataController {
    constructor() { }
    async getData(): Promise<ILineData[]> {
        return await Data.find().sort({ 'date': 1 }).lean().exec() as ILineData[];
    }
    async postData(newData): Promise<void> {
        let data = new Data(newData);
        await data.save();
    }
}
