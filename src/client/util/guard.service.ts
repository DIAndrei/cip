import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { SessionService } from './session.service'

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private _router: Router,
        private _sessionService: SessionService) { }

    canActivate() {
        if (this._sessionService.isLoggedIn()) {
            return true;
        }

        this._router.navigate(['/login']);
        return false;
    }
}
