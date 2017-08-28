import { NgModule } from '@angular/core';
import { HttpModule, Http } from '@angular/http';
import { HttpWrap } from './util/http-wrap.service';
import { SessionService } from './util/session.service';
import { AuthGuard } from './util/guard.service';
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
import { InstallsComponent } from './reports/installs/installs.component';

const routes: Routes = [
    //  { path: 'versions', component: VersionsComponent, canActivate: [AuthGuard] },
    { path: 'versions', component: VersionsComponent },
    { path: 'installs', component: InstallsComponent }
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
        InstallsComponent,
        ChartComponent,
        ChartDirective,
        LineChartComponent,
        PieChartComponent,
        BarChartComponent
    ],
    providers: [
        ChartService,
        HttpWrap,
        SessionService,
        AuthGuard
    ],
    exports: [
        RouterModule,
        VersionsComponent,
        InstallsComponent,
        ChartComponent
    ],
    entryComponents: [LineChartComponent, PieChartComponent, BarChartComponent]
})
export class AppRoutingModule { }
