import { Component } from '@angular/core';
import { SessionService } from './util/session.service';
import { BarChartComponent } from './barChart/barChart.component';
import { LineChartComponent } from './lineChart/lineChart.component';
import { PieChartComponent } from './pieChart/pieChart.component';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent {

  constructor(private _sessionService: SessionService) { }

  private isLoggedIn() {
    return this._sessionService.isLoggedIn();
  }

}
