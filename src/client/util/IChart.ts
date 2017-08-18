import { IChartData } from './../../server/types/IChartData'

export interface IChart {
    type: IChartType,
    data: IChartData[]
}

export enum IChartType {
    Bar,
    Line,
    Pie
}
