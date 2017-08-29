import { NgModule } from '@angular/core';
import { HttpModule, Http } from '@angular/http';
import { HttpWrap } from './util/http-wrap.service';
import { SessionService } from './util/session.service';
import { AuthGuard } from './util/guard.service';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from './util/sidebar/sidebar.component';
import { ChartComponent } from './util/chart/chart.component';
import { ChartService } from './util/chart/chart.service';
import { ChartDirective } from './util/chart/chart.directive';
import { LineChartComponent } from './lineChart/lineChart.component';
import { PieChartComponent } from './pieChart/pieChart.component';
import { BarChartComponent } from './barChart/barChart.component';
import { VersionsComponent } from './reports/versions/versions.component';
import { InstallsComponent } from './reports/installs/installs.component';
import { RegisterComponent } from './register/register.component';
import { UserService } from './user/user.service';
import { AuthenticationService } from './authentication/authentication.service';
import { AuthenticationComponent } from './authentication/authentication.component';
import { NavbarComponent } from './util/navbar/navbar.component';
import { ProfileComponent } from './user/profile/profile.component';
import { ProfileService } from './user/profile/profile.service';
import { UserPasswordComponent } from './user/profile/user-pass.component';

const routes: Routes = [
    { path: 'login', component: AuthenticationComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'versions', component: VersionsComponent, canActivate: [AuthGuard] },
    { path: 'installs', component: InstallsComponent, canActivate: [AuthGuard] },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        RouterModule.forRoot(routes),
        RouterModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        AuthenticationComponent,
        RegisterComponent,
        NavbarComponent,
        VersionsComponent,
        InstallsComponent,
        ChartComponent,
        ChartDirective,
        LineChartComponent,
        PieChartComponent,
        BarChartComponent,
        SidebarComponent,
        ProfileComponent,
        UserPasswordComponent
    ],
    providers: [
        ChartService,
        HttpWrap,
        SessionService,
        AuthenticationService,
        ProfileService,
        UserService,
        AuthGuard
    ],
    exports: [
        RouterModule,
        VersionsComponent,
        InstallsComponent,
        ChartComponent,
        NavbarComponent,
        SidebarComponent,
        AuthenticationComponent,
        ProfileComponent
    ],
    entryComponents: [LineChartComponent, PieChartComponent, BarChartComponent]
})
export class AppRoutingModule { }
