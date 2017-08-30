import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
    moduleId: module.id,
    selector: 'environment',
    templateUrl: './environment.html'
})
export class EnvironmentComponent {
    constructor() { }
    private charts: Object[] = [
        {
            title: 'OS distribution',
            report: 'osdist'
        },
        {
            title: 'Platform type',
            report: 'platform'
        },
        {
            title: 'Physical memory',
            report: 'memory'
        },
        {
            title: 'Screen resolution',
            report: 'resolution'
        }
    ];
}
