interface IValues {
    date: Date,
    sessions: number
}
export interface IResponse {
    total?: number,
    values?: IValues[],
    prop: string,
    value?: number
}
