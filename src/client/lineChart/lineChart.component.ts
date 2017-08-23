import { Component, Input, Injector, ViewChild, ElementRef } from '@angular/core';
import * as d3 from 'd3';
import { IChart, ChartType } from '../util/chart/IChart';
import { IChartData } from './../../server/types/IChartData';

@Component({
  moduleId: module.id,
  template: '<svg #canvas width="900" height="500"></svg>',
  styleUrls: ['lineChart.component.css']
})
export class LineChartComponent implements IChart {
  private chartData: IChartData[];
  private margin = { top: 50, right: 50, bottom: 50, left: 50 };
  private width: number;
  private height: number;
  private x: any;
  private y: any;
  private svg: any;
  private line: d3.Line<[number, number]>;
  private parseTime = d3.timeParse('%Y-%m-%d');
  private tooltip: any;

  @ViewChild('canvas') canvas: ElementRef;

  public type = ChartType.Line;

  constructor(
    private _injector: Injector
  ) {
    this.width = 900 - this.margin.left - this.margin.right;
    this.height = 500 - this.margin.top - this.margin.bottom;
  }

  /**
   * IChart interface methods
   */
  setData(data: IChartData[]) {
    this.initData(data);
  }

  private initData(data: IChartData[]) {
    this.chartData = data.map((d) => {
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
  }

  private initSvg() {
    this.tooltip = d3.select('ng-component').append('div').attr('class', 'tooltip');
    this.svg = d3.select(this.canvas.nativeElement)
      .append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
  }

  private initAxis() {
    this.x = d3.scaleTime().range([0, this.width]);
    this.y = d3.scaleLinear().range([this.height, 0]);
    this.x.domain(d3.extent(this.chartData, (d) => d.date));
    this.y.domain(d3.extent(this.chartData, (d) => d.value));
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
      .datum(this.chartData)
      .attr('class', 'line')
      .attr('d', this.line);

    this.svg.selectAll('circle')
      .data(this.chartData)
      .enter()
      .append('circle')
      .attr('class', 'data-point')
      .attr('cx', (d: any) => { return this.x(d.date) })
      .attr('cy', (d: any) => { return this.y(d.value) })
      .attr('r', 5)
      .on('mousemove', (d) => {
        this.tooltip
          .style('left', d3.event.pageX - 50 + 'px')
          .style('top', d3.event.pageY - 70 + 'px')
          .style('display', 'inline-block')
          .html((d.prop) + ': ' + (d.value));
      })
      .on('mouseout', (d) => {
        this.tooltip.style('display', 'none');
      });;
  }
}
