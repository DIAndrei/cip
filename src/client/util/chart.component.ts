import { Component } from '@angular/core';
import * as d3 from 'd3';
import * as d3Shape from "d3-shape";
import { ChartService } from './chart.service';

@Component({
    moduleId: module.id,
    templateUrl: 'chart.html',
    selector: 'chart'
})
export class ChartComponent {

    constructor(private chartService: ChartService) {

    }

    
}
