import { IChartData } from './../../../server/types/IChartData'

export enum ChartType {
    Bar,
    Line,
    Pie
}

export interface IChart {
    type: ChartType;

    /**
     * Set chart data.
     */
    setData (data: IChartData[]);
}
