import { Component, Input, Injector, ViewChild, ElementRef } from '@angular/core';
import * as d3 from 'd3';
import { IChart, ChartType } from '../util/chart/IChart';
import { IChartData } from './../../server/types/IChartData';

@Component({
  moduleId: module.id,
  template: '<svg #canvas width="900" height="500"></svg>',
  styleUrls: ['pieChart.component.css']
})
export class PieChartComponent implements IChart {
  private margin = { top: 50, right: 50, bottom: 50, left: 50 };
  private width: number;
  private height: number;
  private radius: number;
  private arc: any;
  private labelArc: any;
  private pie: any;
  private color: any;
  private svg: any;
  private tooltip: any;

  @ViewChild('canvas') canvas: ElementRef;
  public type = ChartType.Pie;

  constructor(
    private _injector: Injector
  ) {
    this.width = 900 - this.margin.left - this.margin.right;
    this.height = 500 - this.margin.top - this.margin.bottom;
    this.radius = Math.min(this.width, this.height) / 2;
  }

  /**
   * IChart interface methods
   */
  setData(data: IChartData[]) {
    this.initSvg()
    this.drawPie(data);
  }

  private initSvg() {
    this.tooltip = d3.select('ng-component').append('div').attr('class', 'tooltip');
    this.color = d3.scaleOrdinal(d3.schemeCategory10);
    this.arc = d3.arc()
      .outerRadius(this.radius - 10)
      .innerRadius(0);
    this.labelArc = d3.arc()
      .outerRadius(this.radius - 40)
      .innerRadius(this.radius - 40);
    this.pie = d3.pie()
      .sort(null)
      .value((d: any) => d.value);
    this.svg = d3.select(this.canvas.nativeElement)
      .append('g')
      .attr('transform', 'translate(' + this.width / 2 + ',' + this.height / 2 + ')');;
  }

  private drawPie(data: IChartData[]) {
    let g = this.svg.selectAll('.arc')
      .data(this.pie(data))
      .enter().append('g')
      .attr('class', 'arc')
      .on('mousemove', (d) => {
        this.tooltip
          .style('left', d3.event.pageX - 50 + 'px')
          .style('top', d3.event.pageY - 70 + 'px')
          .style('display', 'inline-block')
          .html((d.data.prop) + ': ' + (d.data.value));
      })
      .on('mouseout', (d) => {
        this.tooltip.style('display', 'none');
      });
    g.append('path').attr('d', this.arc)
      .style('fill', (d: any) => this.color(d.data.prop));
    g.append('text').attr('transform', (d: any) => 'translate(' + this.labelArc.centroid(d) + ')')
      .attr('dy', '.35em')
      .text((d: any) => d.data.prop);
  }
}
