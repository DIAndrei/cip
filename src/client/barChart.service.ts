import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";
import { IBarData } from '../server/types/IBarData';

@Injectable()
export class BarChartService {
    data: IBarData[];
    url: '/api/data/bar'

    constructor(
        private _http: Http
    ) { }

    getBarData(): Observable<IBarData[]> {
        return this._http.get(this.url).map(res => res.json());
    }
}
