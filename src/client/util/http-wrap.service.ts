import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { SessionService } from './session.service'

@Injectable()
export class HttpWrap {

    constructor(
        private _http: Http,
        private _sessionService: SessionService
    ) { }

    private createAuthorizationHeader(headers: Headers) {
        headers.append('Authorization', this._sessionService.token);
    }

    get(url: string) {
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this._http.get(url, {
            headers: headers
        });
    }

    post(url: string, data: Object) {
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this._http.post(url, data, {
            headers: headers
        });
    }

    put(url: string, data: Object) {
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this._http.put(url, data, {
            headers: headers
        });
    }

    delete(url: string) {
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this._http.delete(url, {
            headers: headers
        });
    }
}
