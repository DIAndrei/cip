import { IChartData } from './../../server/types/IChartData'

export interface IChart {
    type: ChartType,
    data: IChartData[]
}

export enum ChartType {
    Bar,
    Line,
    Pie
}
