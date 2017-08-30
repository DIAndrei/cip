import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class ForgotService {
    private forgotRoute = '/api/users/forgot';

    constructor(
        private _http: Http
    ) { }

    postForgot(user): Observable<any> {
        return this._http.post(this.forgotRoute, user);
    }

}
