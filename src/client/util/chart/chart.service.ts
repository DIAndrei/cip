import { Component, Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import { IChartData } from '../../../server/types/IChartData';

@Injectable()
export class ChartService {
    constructor(private _http: Http) { }

    private url = '/api/data/';

    getData(query: string): Observable<IChartData[]> {
        return this._http.get(`${this.url}${query}`).map(res => res.json());
    }

    getBarData(): Observable<IChartData[]> {
        return this._http.get(`${this.url}bar?report=versions`).map(res => res.json());
    }

    getLineData(): Observable<IChartData[]> {
        return this._http.get(`${this.url}line?report=installs`).map(res => res.json());
    }

}