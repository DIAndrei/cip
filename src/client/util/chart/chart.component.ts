import { Component, Input, ViewContainerRef, ViewChild, ComponentFactoryResolver, Type } from '@angular/core';
import * as d3 from 'd3';
import * as d3Shape from "d3-shape";
import { ChartService } from './chart.service';
import { ChartType, IChart } from './IChart';
import { IChartData } from '../../../server/types/IChartData';
import { BarChartComponent } from '../../barChart/barChart.component';
import { LineChartComponent } from '../../lineChart/lineChart.component';
import { PieChartComponent } from '../../pieChart/pieChart.component';
import { ChartDirective } from './chart.directive'

@Component({
    moduleId: module.id,
    entryComponents: [BarChartComponent, LineChartComponent, PieChartComponent],
    selector: 'charts',
    templateUrl: './chart.html',
    styleUrls: ['chart.component.css']
})
export class ChartComponent {
    @Input() name: string;
    @ViewChild(ChartDirective) chartHost: ChartDirective;

    private chart: IChart;
    private chartType: ChartType = ChartType.Line;

    protected data;
    public ChartEnum = ChartType;

    constructor(
        private _componentFactoryResolver: ComponentFactoryResolver,
        private _chartService: ChartService
    ) { }

    ngAfterViewInit() {
        this.loadComponent(this.chartType);
    }

    loadComponent(type: ChartType) {
        let compClass = this.getChartComponent(type);
        let componentFactory = this._componentFactoryResolver.resolveComponentFactory(compClass);
        let viewContainerRef = this.chartHost._viewContainerRef;
        viewContainerRef.clear();
        let componentRef = viewContainerRef.createComponent(componentFactory);
        this.chart = componentRef.instance;

        this._chartService.getData(this.getQuery(type)).subscribe(
            data => {
                this.chart.setData(data);
            },
            err => console.error(err)
        );
    }

    private getChartComponent(chartType: ChartType): Type<IChart> {
        switch (chartType) {
            case ChartType.Bar:
                return BarChartComponent;
            case ChartType.Line:
                return LineChartComponent;
            case ChartType.Pie:
                return PieChartComponent;
            default:
                return LineChartComponent;
        }
    }

    private getQuery(chartType: ChartType): string {
        switch (chartType) {
            case ChartType.Bar:
                return `bar?report=${this.name}`;
            case ChartType.Line:
                return `line?report=${this.name}`;
            case ChartType.Pie:
                return `bar?report=${this.name}`;
            default:
                return `line?report=${this.name}`;
        }
    }
}
