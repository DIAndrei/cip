import { Request, Response } from 'express';
import { DataModel as Data } from '../models/lineData';
import { IChartData } from '../types/IChartData';

export class DataController {
    constructor() { }
    async getData(): Promise<IChartData[]> {
        return await Data.find().sort({ 'date': 1 }).lean().exec() as IChartData[];
    }
    async postData(newData: IChartData): Promise<void> {
        let data = new Data(newData);
        await data.save();
    }
}
