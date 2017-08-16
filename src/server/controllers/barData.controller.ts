import { Request, Response } from 'express';
import { BarDataModel as Data } from '../models/barData';
import { IBarData } from '../types/IBarData';
export class DataController {
    constructor() { }
    async getData(): Promise<IBarData[]> {
        return await Data.find().lean().exec() as IBarData[];
    }
    async postData(newData: IBarData): Promise<void> {
        let data = new Data(newData);
        await data.save();
    }
}
