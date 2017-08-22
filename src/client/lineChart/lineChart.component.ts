import { Component, OnInit, Input, Injector } from '@angular/core';
import * as d3 from 'd3';
import { IChartData } from './../../server/types/IChartData';
import { ChartService } from './../util/chart.service';

@Component({
  moduleId: module.id,
  template: '<svg width="900" height="500"></svg>',
  styleUrls: ['lineChart.component.css']
})
export class LineChartComponent implements OnInit {

  // @Input() data: IChartData[];
  private data: IChartData[];

  private margin = { top: 20, right: 20, bottom: 30, left: 50 };
  private width: number;
  private height: number;
  private x: any;
  private y: any;
  private svg: any;
  private line: d3.Line<[number, number]>;
  private parseTime = d3.timeParse('%Y-%m-%d');

  constructor(
    private _lineChartService: ChartService,
    private _injector: Injector
  ) {
    this.width = 900 - this.margin.left - this.margin.right;
    this.height = 500 - this.margin.top - this.margin.bottom;
  }

  ngOnInit() {
    this.getData();
  }

  // setDate(date: Date) { }

  getData() {
    this._lineChartService.getLineData().subscribe(
      data => {
        this.data = data.map((d) => {
          return {
            prop: d.prop,
            date: this.parseTime(d.date as any),
            value: d.value,
            report: d.report
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
      .call(d3.axisBottom(this.x)
        .ticks(d3.timeDay.every(2))
        .tickFormat(d3.timeFormat('%b %d')));

    this.svg.append('g')
      .attr('class', 'axis axis--y')
      .call(d3.axisLeft(this.y))
      .append('text')
      .attr('class', 'axis-title')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '.71em')
      .style('text-anchor', 'end');
  }

  private drawLine() {
    this.line = d3.line()
      .x((d: any) => this.x(d.date))
      .y((d: any) => this.y(d.value));

    this.svg.append('path')
      .datum(this.data)
      .attr('class', 'line')
      .attr('d', this.line);

    this.svg.selectAll('circle')
      .data(this.data)
      .enter()
      .append('circle')
      .attr('class', 'data-point')
      .attr('cx', (d: any) => { return this.x(d.date) })
      .attr('cy', (d: any) => { return this.y(d.value) })
      .attr('r', 5);
  }
}
