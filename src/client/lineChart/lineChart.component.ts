import { Component, Input, Injector, ViewChild, ElementRef } from '@angular/core';
import * as d3 from 'd3';
import { IChart, ChartType } from '../util/chart/IChart';
import { IResponse } from './../../server/types/IResponse';

@Component({
  moduleId: module.id,
  template: '<svg #canvas width="900" height="500"></svg>',
  styleUrls: ['lineChart.component.css']
})
export class LineChartComponent implements IChart {
  private dates: Date[];
  private margin = { top: 50, right: 50, bottom: 50, left: 50 };
  private width: number;
  private height: number;
  private x: any;
  private y: any;
  private z: any;
  private g: any;
  private svg: any;
  private line: d3.Line<[number, number]>;
  private parseTime = d3.timeParse('%Y-%m-%d');
  private tooltip: any;
  private chartData: IResponse[];

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
  setData(data: IResponse[]) {
    this.initData(data);
  }

  private initData(data: IResponse[]) {
    this.chartData = data.map((d) => {
      return {
        prop: d.prop,
        values: d.values.map((c) => {
          return {
            date: this.parseTime(c.date as any),
            sessions: +c.sessions,
            prop: d.prop
          }
        })
      };
    });
    this.dates = data.map((v) => v.values.map((v) => this.parseTime(v.date as any)))[0];

    this.initChart();
    this.drawAxis();
    this.drawLine();
  }

  private initChart() {
    this.tooltip = d3.select('ng-component').append('div').attr('class', 'tooltip');
    this.svg = d3.select(this.canvas.nativeElement);
    this.width = this.svg.attr('width') - this.margin.left - this.margin.right;
    this.height = this.svg.attr('height') - this.margin.top - this.margin.bottom;
    this.g = this.svg.append('g').attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
    this.x = d3.scaleTime().range([0, this.width]);
    this.y = d3.scaleLinear().range([this.height, 0]);
    this.z = d3.scaleOrdinal(d3.schemeCategory10);
    this.line = d3.line()
      .x((d: any) => this.x(d.date))
      .y((d: any) => this.y(d.sessions));
    this.x.domain(d3.extent(this.dates, (d: Date) => d));
    this.y.domain([
      d3.min(this.chartData, (c) => { return d3.min(c.values, (d) => { return d.sessions; }); }),
      d3.max(this.chartData, (c) => { return d3.max(c.values, (d) => { return d.sessions; }); })
    ]);

    this.z.domain(this.chartData.map((c) => { return c.prop; }));
  }

  private drawAxis() {
    this.g.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3.axisBottom(this.x));

    this.g.append('g')
      .attr('class', 'axis axis--y')
      .call(d3.axisLeft(this.y))
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '0.71em')
      .attr('fill', '#000');
  }

  private drawLine() {
    let line = this.g.selectAll('.line')
      .data(this.chartData)
      .enter().append('g')
      .attr('class', (d) => d.prop);

    line.append('path')
      .attr('class', 'line')
      .attr('d', (d) => this.line(d.values))
      .style('stroke', (d) => this.z(d.prop));

    line.selectAll('.circle')
      .data((d: any) => { return d.values })
      .enter()
      .append('circle')
      .attr('class', 'circle')
      .style('stroke', (d) => { return this.z(d.prop) })
      .style('fill', '#fff')
      .style('stroke-width', 3)
      .attr('r', 4)
      .attr('cx', (d: any) => {
        return this.x(d.date);
      })
      .attr('cy', (d: any) => {
        return this.y(d.sessions);
      })
      .on('mousemove', (d: any) => {
        this.tooltip
          .style('left', d3.event.pageX - 50 + 'px')
          .style('top', d3.event.pageY - 70 + 'px')
          .style('display', 'inline-block')
          .html(((d.prop)) + ': ' + (d.sessions));
      })
      .on('mouseout', (d: any) => {
        this.tooltip.style('display', 'none');
      });
  }
}