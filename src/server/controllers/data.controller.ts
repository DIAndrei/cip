import { Request, Response } from 'express';
import { DataModel as Data } from '../models/data';
import { IChartData } from '../types/IChartData';

export class DataController {
    constructor() { }
    async getData(report): Promise<IChartData[]> {
        return await Data.aggregate(
            { $match: report },
            {
                $group: {
                    _id: '$prop',
                    value: { $sum: '$value' }
                }
            },
            {
                $project: {
                    _id: 0,
                    prop: '$_id',
                    value: 1
                }
            }
        ).exec() as IChartData[];
    }
    async getLineData(report): Promise<IChartData[]> {
        return await Data.aggregate([
            { $match: report },
            {
                $group: {
                    _id: {
                        prop: "$prop"
                    },
                    total: { $sum: "$value" },
                    values: { $push: { date: { $dateToString: { format: "%Y-%m-%d", date: "$date" } }, sessions: "$value" } },
                }
            },
            {
                $project: {
                    _id: 0,
                    prop: "$_id.prop",
                    total: 1,
                    values: 1
                }
            }
        ]).exec() as IChartData[];
    }
    async postData(newData: IChartData): Promise<void> {
        let data = new Data(newData);
        await data.save();
    }
}
