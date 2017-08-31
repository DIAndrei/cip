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

    getToken(token: string): Observable<any> {
        return this._http.get(`${this.resetRoute}${token}`);
    }

    postReset(user: Object, token: string): Observable<any> {
        return this._http.post(`${this.resetRoute}${token}`, user);
    }

}
