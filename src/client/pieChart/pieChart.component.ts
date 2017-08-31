import { Component, Input, Injector, ViewChild, ElementRef } from '@angular/core';
import * as d3 from 'd3';
import { IChart, ChartType } from '../util/chart/IChart';
import { IChartData } from './../../server/types/IChartData';

@Component({
  moduleId: module.id,
  template: `
    <svg #canvas width="900" height="500"></svg>
    <svg #legend width="900" height="50"></svg>
  `,
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
  private legendSvg: any;
  private tooltip: any;
  private chartData: IChartData[];

  @ViewChild('canvas') canvas: ElementRef;
  @ViewChild('legend') legend: ElementRef;

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
    this.legendSvg = d3.select(this.legend.nativeElement);
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
    this.chartData = data;
    let color = d3.scaleOrdinal(d3.schemeCategory10);
    var total = d3.sum(data, (d) => { return d.value; });

    let g = this.svg.selectAll('.arc')
      .data(this.pie(data))
      .enter().append('g')
      .attr('class', 'arc')
      .on('mousemove', (d) => {
        this.tooltip
          .style('left', d3.event.pageX - 50 + 'px')
          .style('top', d3.event.pageY - 70 + 'px')
          .style('display', 'inline-block')
          .html((d.data.prop) + ':<br>' + (d3.format('.2f')(100 * d.data.value / total)) + '%' + ' (' + (d.data.value) + ')');
      })
      .on('mouseout', (d) => {
        this.tooltip.style('display', 'none');
      });
    g.append('path').attr('d', this.arc)
      .style('fill', (d: any) => this.color(d.data.prop));
    g.append('text').attr('transform', (d: any) => 'translate(' + this.labelArc.centroid(d) + ')')
      .attr('dy', '.35em')
      .text((d: any) => d.data.prop + ' ' + d3.format('.2f')(100 * d.data.value / total) + '%');

    let legendDotSize = 30;
    let legendWrapper = this.legendSvg.append('g')
      .attr('class', 'legend')
      .attr('transform', (d) => { return 'translate(275, 5)'; })

    let legendText = legendWrapper.selectAll('text')
      .data(this.chartData);

    legendText.enter().append('text')
      .attr('x', (d, i) => { return i * (legendDotSize * 5); })
      .attr('y', legendDotSize)
      .merge(legendText)
      .text((d) => {
        return d.prop;
      });

    legendText.exit().remove();

    let legendDot = legendWrapper.selectAll('rect')
      .data(this.chartData)
      .enter().append('rect')
      .attr('x', (d, i) => { return i * (legendDotSize * 5); })
      .attr('width', legendDotSize * 0.5)
      .attr('height', legendDotSize * 0.5)
      .style('fill', (d) => { return color(d.prop) });

    legendDot.exit().remove();

  }
}
