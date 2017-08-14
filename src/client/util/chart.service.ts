import { Component, Injectable } from '@angular/core';
import { ChartComponent } from './chart.component';
import { Http } from '@angular/http';
import { Datum } from '../data';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class ChartService {
    private headers = new Headers({'Content-Type': 'application/json'});

    private url = 'http://localhost:3000/api/data';
    constructor(private http: Http) { }


    getData(): Promise<Datum[]> {
        return this.http.get(this.url)
            .toPromise()
            .then(response => response.json() as Datum[])
            .catch(this.handleError);
    }

    private handleError(error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }


}