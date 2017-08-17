import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

import { ChartComponent } from './util/chart.component';
import { Data } from './data';
import { ILineData } from '../server/types/ILineData';
import { LineChartService } from './lineChart.service';


@Component({
  moduleId: module.id,
  selector: 'line-chart',
  templateUrl: './lineChart.html',
  styleUrls: ['lineChart.component.css']
})

export class LineChartComponent implements OnInit {

  private margin = { top: 20, right: 20, bottom: 30, left: 50 };
  private width: number;
  private height: number;

  private data: ILineData[];

  private x: any;
  private y: any;
  private svg: any;
  private line: d3.Line<[number, number]>;

  private parseTime = d3.timeParse("%Y-%m-%dT%H:%M:%S.%LZ");

  constructor(private _lineChartService: LineChartService) {

    this.width = 900 - this.margin.left - this.margin.right;
    this.height = 500 - this.margin.top - this.margin.bottom;
  }

  ngOnInit() {
    this.getData();

  }

  getData() {
    this._lineChartService.getLineData().subscribe(
      data => {
        this.data = data.map((d) => {
          return {
            date: this.parseTime(d.date),
            value: d.value
          };
        });
        this.initSvg();
        this.initAxis();
        this.drawAxis();
        this.drawLine();
      },
      err => console.error(err)
    );
  }

  private initSvg() {
    this.svg = d3.select('svg')
      .append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
  }

  private initAxis() {
    this.x = d3.scaleTime().range([0, this.width]);
    this.y = d3.scaleLinear().range([this.height, 0]);
    this.x.domain(d3.extent(this.data, (d) => d.date));
    this.y.domain(d3.extent(this.data, (d) => d.value));
  }

  private drawAxis() {

    this.svg.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3.axisBottom(this.x));

    this.svg.append('g')
      .attr('class', 'axis axis--y')
      .call(d3.axisLeft(this.y))
      .append('text')
      .attr('class', 'axis-title')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '.71em')
      .style('text-anchor', 'end')
      .text('Price ($)');
  }

  private drawLine() {
    this.line = d3.line()
      .x((d: any) => this.x(d.date))
      .y((d: any) => this.y(d.value));

    this.svg.append('path')
      .datum(this.data)
      .attr('class', 'line')
      .attr('d', this.line);

  }
}
