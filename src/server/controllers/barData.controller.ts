import { Request, Response } from 'express';
import { BarDataModel as Data } from '../models/barData';
import { IChartData } from '../types/IChartData';

export class DataController {
    constructor() { }
    async getData(): Promise<IChartData[]> {
        return await Data.find().lean().exec() as IChartData[];
    }
    async postData(newData: IChartData): Promise<void> {
        let data = new Data(newData);
        await data.save();
    }
}
