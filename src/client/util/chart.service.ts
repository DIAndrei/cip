import { Component, Injectable } from '@angular/core';
import { ChartComponent } from './chart.component';
import { Http } from '@angular/http';


@Injectable()
export class ChartService {
    private headers = new Headers({'Content-Type': 'application/json'});

    private url = 'http://localhost:3000';
    constructor(private http: Http) { }
}