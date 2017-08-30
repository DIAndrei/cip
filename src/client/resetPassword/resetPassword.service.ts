import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class ResetPasswordService {
    private resetRoute = '/api/users/reset/';

    constructor(
        private _http: Http
    ) { }

    postReset(user, token): Observable<any> {
        return this._http.post(`${this.resetRoute}${token}` , user);
    }

}
