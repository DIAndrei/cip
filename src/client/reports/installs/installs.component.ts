import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
    moduleId: module.id,
    selector: 'installs-comp',
    templateUrl: './installs.component.html',
    providers: []
})

export class InstallsComponent {
    constructor(){}
    private report: string = 'installs';
    private title: string = "Installs"

}