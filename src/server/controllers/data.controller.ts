import { Request, Response } from 'express';
import { DataModel as Data } from '../models/data';

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
