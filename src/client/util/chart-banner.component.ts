import { Component, Input, AfterViewInit, ViewChild, ComponentFactoryResolver, OnDestroy } from '@angular/core';

import { ChartDirective } from './chart.directive';
import { IChartData } from '../../server/types/IChartData';
import { ChartItem } from './chart-item';
import { ChartComponent } from './chart.component';

@Component({
  selector: 'chart-banner',
  template: `
              <div class="chart-banner">
                <ng-template chart-host></ng-template>
              </div>
            `
})

export class ChartBannerComponent implements AfterViewInit {
    @Input() charts: ChartItem[];
    @ViewChild(ChartDirective) chartHost: ChartDirective;
    subscription: any;
    interval: any;

    currentAddIndex: number = -1;

    constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

    ngAfterViewInit() {
        this.loadComponent();
        this.getCharts();
    }

    ngOnDestroy() {
        clearInterval(this.interval);
    }

    loadComponent() {
        this.currentAddIndex = (this.currentAddIndex + 1) % this.charts.length;
        let chartItem = this.charts[this.currentAddIndex];

        let componentFactory = this.componentFactoryResolver.resolveComponentFactory(chartItem.component);

        let viewContainerRef = this.chartHost.viewContainerRef;
        viewContainerRef.clear();

        let componentRef = viewContainerRef.createComponent(componentFactory);
        (<ChartComponent>componentRef.instance).data = chartItem.data;
    }

    getCharts() {
        this.interval = setInterval(() => {
        this.loadComponent();
        }, 3000);
    }


}