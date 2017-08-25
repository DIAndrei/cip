import { NgModule } from '@angular/core';
import { HttpModule, Http } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { ChartComponent } from './util/chart/chart.component';
import { ChartService } from './util/chart/chart.service';
import { ChartDirective } from './util/chart/chart.directive';
import { LineChartComponent } from './lineChart/lineChart.component';
import { PieChartComponent } from './pieChart/pieChart.component';
import { BarChartComponent } from './barChart/barChart.component';
import { VersionsComponent } from './reports/versions/versions.component';

const routes: Routes = [
    { path: 'versions', component: VersionsComponent }
];

@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        RouterModule.forRoot(routes),
        RouterModule
    ],
    declarations: [
        VersionsComponent,
        ChartComponent,
        ChartDirective,
        LineChartComponent,
        PieChartComponent,
        BarChartComponent
    ],
    providers: [
        ChartService
    ],
    exports: [
        RouterModule,
        VersionsComponent,
        ChartComponent
    ],
    entryComponents: [LineChartComponent, PieChartComponent, BarChartComponent]
})
export class AppRoutingModule { }
