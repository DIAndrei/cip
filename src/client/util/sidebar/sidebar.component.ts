import { Component } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['sidebar.component.css']
})
export class SidebarComponent {
    private title: string = 'Analytics';
    private reports: Object[] = [
        {
            title: 'Installs',
            link: 'installs'
        },
        {
            title: 'Versions',
            link: 'versions'
        }
    ];
}
