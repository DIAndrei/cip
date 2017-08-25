import { Component } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'versions',
    templateUrl: './versions.component.html'
})
export class VersionsComponent {
    private title: string = 'Version Installs';
    private report: string = 'versions';
}
