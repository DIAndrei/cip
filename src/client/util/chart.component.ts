import { Component, Input, ViewContainerRef, ViewChild, ReflectiveInjector, ComponentFactoryResolver, Type } from '@angular/core';
import * as d3 from 'd3';
import * as d3Shape from "d3-shape";
import { ChartService } from './chart.service';
import { IChart, ChartType } from './IChart';
import { IChartData } from '../../server/types/IChartData';
import { BarChartComponent } from '../barChart/barChart.component';
import { LineChartComponent } from '../lineChart/lineChart.component';
import { PieChartComponent } from '../pieChart/pieChart.component';
import { ChartDirective } from './chart.directive'

@Component({
    moduleId: module.id,
    entryComponents: [BarChartComponent, LineChartComponent, PieChartComponent],
    selector: 'charts',
    templateUrl: 'chart.html'
})
export class ChartComponent {
    public ChartEnum = ChartType;

    private chartType: ChartType = ChartType.Line;
    @ViewChild(ChartDirective) chartHost: ChartDirective;
    currentChartIndex = 0;
    constructor(
        private _componentFactoryResolver: ComponentFactoryResolver
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
    }

    private getChartComponent(chartType: ChartType): Type<any> {
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
}
