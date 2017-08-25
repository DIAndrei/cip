import { NgModule } from '@angular/core';
import { HttpModule, Http } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';

const routes: Routes = [

];

@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        RouterModule.forRoot(routes),
        RouterModule
    ],
    declarations: [

    ],
    providers: [

    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
