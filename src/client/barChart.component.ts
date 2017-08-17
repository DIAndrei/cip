import { Component, OnInit, Input } from '@angular/core';
import * as d3 from 'd3';
import { ChartService } from './util/chart.service';
import { ChartComponent } from './util/chart.component';
import { IBarData } from '../server/types/IBarData';

@Component({
    moduleId: module.id,
    selector: 'bar-chart',
    templateUrl: './lineChart.html',
    styleUrls: ['barChart.component.css']
})
export class BarChartComponent implements OnInit, ChartComponent {


    @Input() data: IBarData[];
    private width: number;
    private height: number;
    private margin = { top: 20, right: 20, bottom: 30, left: 40 };
    // private data: IBarData[];

    private x: any;
    private y: any;
    private svg: any;
    private g: any;

    constructor(
        private _barChartService: ChartService
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
        this.svg = d3.select("svg");
        this.width = +this.svg.attr("width") - this.margin.left - this.margin.right;
        this.height = +this.svg.attr("height") - this.margin.top - this.margin.bottom;
        this.g = this.svg.append("g")
            .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");;
    }

    initAxis() {
        this.x = d3.scaleBand().rangeRound([0, this.width]).padding(0.1);
        this.y = d3.scaleLinear().rangeRound([this.height, 0]);
        this.x.domain(this.data.map((d) => d.prop));
        this.y.domain([0, d3.max(this.data, (d) => d.value)]);
    }

    drawAxis() {
        this.g.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + this.height + ")")
            .call(d3.axisBottom(this.x));
        this.g.append("g")
            .attr("class", "axis axis--y")
            .call(d3.axisLeft(this.y).ticks(10, "%"))
            .append("text")
            .attr("class", "axis-title")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", "0.71em")
            .attr("text-anchor", "end")
            .text("Frequency");
    }

    drawBars() {
        this.g.selectAll(".bar")
            .data(this.data)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", (d) => this.x(d.prop))
            .attr("y", (d) => this.y(d.value))
            .attr("width", this.x.bandwidth())
            .attr("height", (d) => this.height - this.y(d.value));
    }
}
