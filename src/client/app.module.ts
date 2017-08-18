import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// import { ChartComponent } from './util/chart.component';
import { ChartService } from './util/chart.service';
import { ChartComponent } from './util/chart.component';
import { ChartDirective } from './util/chart.directive';
import { LineChartComponent } from './lineChart/lineChart.component';
import { PieChartComponent } from './pieChart/pieChart.component';
import { BarChartComponent } from './barChart/barChart.component';

import { AppComponent } from './app.component';

// import { AppRoutingModule } from './app-routing.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    // AppRoutingModule,
    HttpModule,
  ],
  declarations: [
    AppComponent,
    ChartComponent,
    LineChartComponent,
    PieChartComponent,
    BarChartComponent,
    ChartDirective
  ],
  providers: [
    ChartService
  ],
  bootstrap: [AppComponent],

  entryComponents: [LineChartComponent, PieChartComponent, BarChartComponent]
})
export class AppModule { }
