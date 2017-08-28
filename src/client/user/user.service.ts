import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpWrap } from '../util/http-wrap.service'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
// import { IUser } from './IUser';
import { SessionService } from '../util/session.service';

@Injectable()
export class UserService {
    private userRoute = '/api/users/';

    constructor(
        private _http: Http,
        private _sessionService: SessionService,
        private _httpAuth: HttpWrap
    ) { }

    register(user: Object): Observable<any> {
        return this._http.post(this.userRoute, user);
    }

    authenticate(credentials: Object): Observable<any> {
        return this._http.post(`${this.userRoute}auth`, credentials);
    }

    // getUser(username: string): Observable<IUser> {
    //     return this._http.get(`${this.userRoute}${username}`).map(res => res.json());
    // }

    editUser(username: string, editedUser: Object): Observable<any> {
        return this._httpAuth.put(`${this.userRoute}${username}`, editedUser);
    }
}
