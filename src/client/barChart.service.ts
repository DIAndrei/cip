import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import { IBarData } from '../server/types/IBarData';

@Injectable()
export class BarChartService {
    private barUrl = '/api/data/bar/';

    constructor(
        private _http: Http
    ) { }

    getBarData(): Observable<IBarData[]> {
        return this._http.get(this.barUrl).map(res => res.json());
    }
}
