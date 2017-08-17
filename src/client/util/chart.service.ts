import { Component, Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ChartComponent } from './chart.component';

@Injectable()
export class ChartService {
    constructor(private http: Http) { }
}