import { Component } from '@angular/core';
import {ChartComponent } from './util/chart.component';
import { LineChartComponent } from './lineChart.component';

@Component({
  selector: 'my-app',
  template: `
    <h1>{{title}}</h1>
    <chart> </chart>
    <line-chart> </line-chart>
  `,
})
export class AppComponent {
}