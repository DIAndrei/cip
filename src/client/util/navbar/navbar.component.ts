import { Component } from '@angular/core';
// import { AuthService } from '../auth.service';
import { SessionService } from '../session.service';

@Component({
    moduleId: module.id,
    selector: 'app-nav',
    templateUrl: './navbar.component.html'
})
export class NavbarComponent {
    constructor(
        // private _authService: AuthService,
        private _sessionService: SessionService
    ) { }

    getUser(): string {
        return this._sessionService.profile.email;
    }

    isLogged(): boolean {
        return this._sessionService.isLoggedIn();
    }

    // clickLogout(): void {
    //     this._authService.logout();
    // }
}
