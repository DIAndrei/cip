import { Inject, Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import { UserService } from '../user/user.service';
import { SessionService } from '../util/session.service';

import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {
    constructor(
        private userService: UserService,
        private router: Router,
        private sessionService: SessionService
    ) { }

    authenticate(usernamePassword: Object) {
        return this.userService.authenticate(usernamePassword).map(res => res.json()).map(
            res => {
                let token = res.token;
                let profile = res.profile;
                this.sessionService.setSession(token, profile);
            }
        );
    }

    logout() {
        this.sessionService.resetSession();
        this.router.navigate(['/login']);
    }

}
