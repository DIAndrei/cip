import { Component, Injectable } from '@angular/core';
import { HttpWrap } from '../http-wrap.service';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import { IChartData } from '../../../server/types/IChartData';

@Injectable()
export class ChartService {
    constructor(private _http: HttpWrap) { }

    private url = '/api/data/';

    getData(query: string): Observable<IChartData[]> {
        return this._http.get(`${this.url}${query}`).map(res => res.json());
    }
}
