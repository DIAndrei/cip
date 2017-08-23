import { Component, Input, Injector, ViewChild, ElementRef } from '@angular/core';
import * as d3 from 'd3';
import { IChart, ChartType } from '../util/chart/IChart';
import { IChartData } from './../../server/types/IChartData';

@Component({
    moduleId: module.id,
    template: '<svg #canvas width="900" height="500"></svg>',
    styleUrls: ['barChart.component.css']
})
export class BarChartComponent implements IChart {
    private width: number;
    private height: number;
    private margin = { top: 50, right: 50, bottom: 50, left: 50 };
    private x: any;
    private y: any;
    private svg: any;
    private g: any;
    private tooltip: any;

    @ViewChild('canvas') canvas: ElementRef;

    public type = ChartType.Bar;

    constructor(
        private _injector: Injector
    ) { }

    /**
     * IChart interface methods
     */
    setData(data: IChartData[]) {
        this.initSvg();
        this.initAxis(data);
        this.drawAxis();
        this.drawBars(data);
    }

    private initSvg() {
        this.tooltip = d3.select('ng-component').append('div').attr('class', 'tooltip');
        this.svg = d3.select(this.canvas.nativeElement);
        this.width = +this.svg.attr('width') - this.margin.left - this.margin.right;
        this.height = +this.svg.attr('height') - this.margin.top - this.margin.bottom;
        this.g = this.svg.append('g')
            .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');;
    }

    private initAxis(data: IChartData[]) {
        this.x = d3.scaleLinear().rangeRound([0, this.width]);
        this.y = d3.scaleBand().rangeRound([this.height, 0]).padding(0.1);
        this.x.domain([0, d3.max(data, (d) => d.value)]);
        this.y.domain(data.map((d) => d.prop));
    }

    private drawAxis() {
        this.g.append('g')
            .attr('class', 'axis axis--x')
            .attr('transform', 'translate(0,' + this.height + ')')
            .call(d3.axisBottom(this.x));

        this.g.append('g')
            .attr('class', 'axis axis--y')
            .call(d3.axisLeft(this.y));
    }

    private drawBars(data: IChartData[]) {
        this.g.selectAll('.bar')
            .data(data)
            .enter()
            .append('rect')
            .attr('class', 'bar')
            .attr('x', 0)
            .attr('y', (d) => this.y(d.prop))
            .attr('height', this.y.bandwidth())
            .attr('width', (d) => this.x(d.value))
            .on('mousemove', (d) => {
                this.tooltip
                    .style('left', d3.event.pageX - 50 + 'px')
                    .style('top', d3.event.pageY - 70 + 'px')
                    .style('display', 'inline-block')
                    .html((d.prop) + ': ' + (d.value));
            })
            .on('mouseout', (d) => {
                this.tooltip.style('display', 'none');
            });
    }
}
