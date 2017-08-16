import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';


import { STATISTICS } from './dataBar';

@Component({
    moduleId: module.id,
    selector: 'bar-chart',
    templateUrl: './barChart.html',
    styleUrls: ['barChart.component.css']
})
export class BarChartComponent implements OnInit {
    private width: number;
    private height: number;
    private margin = { top: 20, right: 20, bottom: 30, left: 40 };

    private x: any;
    private y: any;
    private svg: any;
    private g: any;

    constructor() { }

    ngOnInit() {
        this.initSvg()
        this.initAxis();
        this.drawAxis();
        this.drawBars();
    }

    private initSvg() {
        this.svg = d3.select("svg");
        this.width = +this.svg.attr("width") - this.margin.left - this.margin.right;
        this.height = +this.svg.attr("height") - this.margin.top - this.margin.bottom;
        this.g = this.svg.append("g")
            .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");;
    }

    private initAxis() {
        this.x = d3.scaleBand().rangeRound([0, this.width]).padding(0.1);
        this.y = d3.scaleLinear().rangeRound([this.height, 0]);
        this.x.domain(STATISTICS.map((d) => d.letter));
        this.y.domain([0, d3.max(STATISTICS, (d) => d.frequency)]);
    }

    private drawAxis() {
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

    private drawBars() {
        this.g.selectAll(".bar")
            .data(STATISTICS)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", (d) => this.x(d.letter))
            .attr("y", (d) => this.y(d.frequency))
            .attr("width", this.x.bandwidth())
            .attr("height", (d) => this.height - this.y(d.frequency));
    }
}
