import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { ChartComponent } from './util/chart.component';
import { ChartService } from './util/chart.service';

import { LineChartComponent } from './lineChart.component';
import { PieChartComponent } from './pieChart.component';

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
    PieChartComponent
  ],
  providers: [ChartService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
