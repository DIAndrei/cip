import { Component, Input, ViewContainerRef, ViewChild, ReflectiveInjector, ComponentFactoryResolver } from '@angular/core';
import * as d3 from 'd3';
import * as d3Shape from "d3-shape";
import { ChartService } from './chart.service';
import { IChart, IChartType } from './IChart';
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
    private chartType: any = IChartType;
    @ViewChild(ChartDirective) chartHost: ChartDirective;
    currentChartIndex = 0;
    constructor(
        private _componentFactoryResolver: ComponentFactoryResolver
    ) { }

    ngAfterViewInit() {
        this.loadComponent('');
    }

    loadComponent(type: string) {
        let compClass = this.getChartComponent(IChartType[type]);
        let componentFactory = this._componentFactoryResolver.resolveComponentFactory(compClass);
        let viewContainerRef = this.chartHost._viewContainerRef;
        viewContainerRef.clear();
        let componentRef = viewContainerRef.createComponent(componentFactory);
        // (<BarChartComponent>componentRef.instance).data = currentChart.data;
    }

    private getChartComponent(chartType: IChartType) {
        switch (chartType) {
            case IChartType.Bar:
                return BarChartComponent;
            case IChartType.Line:
                return LineChartComponent;
            case IChartType.Pie:
                return PieChartComponent;
            default:
                return LineChartComponent;
        }
    }
}
