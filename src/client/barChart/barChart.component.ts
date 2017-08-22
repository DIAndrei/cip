import { Component, OnInit, Input, Injector } from '@angular/core';
import * as d3 from 'd3';
import { ChartService } from './../util/chart.service';
import { IChartData } from './../../server/types/IChartData';

@Component({
    moduleId: module.id,
    template: '<svg width="900" height="500"></svg>',
    styleUrls: ['barChart.component.css']
})
export class BarChartComponent implements OnInit {
    // @Input() data: IChartData[];
    private data: IChartData[];

    private width: number;
    private height: number;
    private margin = { top: 20, right: 20, bottom: 30, left: 40 };
    private x: any;
    private y: any;
    private svg: any;
    private g: any;
    private tooltip: any;

    constructor(
        private _barChartService: ChartService,
        private _injector: Injector
    ) { }

    ngOnInit() {
        this.getData();
    }

    getData() {
        this._barChartService.getBarData().subscribe(
            data => {
                this.data = data;
                this.initSvg();
                this.initAxis();
                this.drawAxis();
                this.drawBars();
            },
            err => console.error(err)
        );
    }

    initSvg() {
        this.svg = d3.select('svg');
        this.tooltip = d3.select('ng-component').append('div').attr('class', 'tooltip');
        this.width = +this.svg.attr('width') - this.margin.left - this.margin.right;
        this.height = +this.svg.attr('height') - this.margin.top - this.margin.bottom;
        this.g = this.svg.append('g')
            .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');;
    }

    initAxis() {
        this.x = d3.scaleLinear().rangeRound([0, this.width]);
        this.y = d3.scaleBand().rangeRound([this.height, 0]).padding(0.1);
        this.x.domain([0, d3.max(this.data, (d) => d.value)]);
        this.y.domain(this.data.map((d) => d.prop));
    }

    drawAxis() {
        this.g.append('g')
            .attr('class', 'axis axis--x')
            .attr('transform', 'translate(0,' + this.height + ')')
            .call(d3.axisBottom(this.x));

        this.g.append('g')
            .attr('class', 'axis axis--y')
            .call(d3.axisLeft(this.y));
    }

    drawBars() {
        this.g.selectAll('.bar')
            .data(this.data)
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
