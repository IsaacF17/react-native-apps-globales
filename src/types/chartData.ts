export interface IChartData {
    date: number;
    name: string;
    type: string;
    value: string;
}

export interface IChartDataItems extends Array<IChartData>{}