import * as mongoose from 'mongoose';
import { DataModel as Data } from '../models/data';
import { IChartData } from '../types/IChartData';
import { IResponse } from '../types/IResponse';

export class DataController {
    constructor() { }
    async getData(params): Promise<IResponse[]> {
        return await Data.aggregate({
            $match: {
                owner: mongoose.Types.ObjectId(params.owner),
                report: params.report
            }
        }, {
                $group: {
                    _id: '$prop',
                    value: { $sum: '$value' }
                }
            }, {
                $project: {
                    _id: 0,
                    prop: '$_id',
                    value: 1
                }
            }).exec() as IResponse[];
    }
    async getLineData(params): Promise<IResponse[]> {
        return await Data.aggregate(
            {
                $match: {
                    owner: mongoose.Types.ObjectId(params.owner),
                    report: params.report
                }
            },
            {
                $group: {
                    _id: {
                        prop: '$prop'
                    },
                    total: { $sum: '$value' },
                    values: { $push: { date: { $dateToString: { format: '%Y-%m-%d', date: '$date' } }, sessions: '$value' } },
                }
            },
            {
                $project: {
                    _id: 0,
                    prop: '$_id.prop',
                    total: 1,
                    values: 1
                }
            }).exec() as IResponse[];
    }
    async postData(newData: IChartData): Promise<void> {
        let data = new Data(newData);
        await data.save();
    }
}
