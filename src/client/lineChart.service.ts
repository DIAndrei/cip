import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import { ILineData } from '../server/types/ILineData';

@Injectable()
export class LineChartService {
    private url = '/api/data/line/';

    constructor(
        private _http: Http
    ) { }

    getLineData(): Observable<ILineData[]> {
        return this._http.get(this.url).map(res => res.json());
    }
}
