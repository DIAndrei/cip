import { Component, Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ChartComponent } from './chart.component';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import { IBarData } from '../../server/types/IBarData';
import { ILineData } from '../../server/types/ILineData';

@Injectable()
export class ChartService {
    constructor(private _http: Http) { }

    private url = '/api/data/';

    getBarData(): Observable<IBarData[]> {
        return this._http.get(`${this.url}bar`).map(res => res.json());
    }

    getLineData(): Observable<ILineData[]> {
        return this._http.get(`${this.url}line`).map(res => res.json());
    }

}