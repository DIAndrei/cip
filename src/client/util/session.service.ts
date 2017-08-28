import { Injectable } from '@angular/core';
import { IUserProfile } from './../../server/types/IUserProfile';

const TOKEN: string = 'token';
const PROFILE: string = 'profile';

@Injectable()
export class SessionService {
    private _token: string;
    private _profile: IUserProfile;

    constructor() {
        let token = localStorage.getItem(TOKEN);
        let profile = localStorage.getItem(PROFILE);
        if (token) {
            this._token = token;
        }
        if (profile) {
            this._profile = JSON.parse(profile);
        }
    }

    setSession(token: string, profile: IUserProfile): void {
        this._token = token;
        this._profile = profile;
        localStorage.setItem(TOKEN, token);
        localStorage.setItem(PROFILE, JSON.stringify(profile));
    }

    resetSession(): void {
        this._profile = null;
        this._token = null;
        localStorage.removeItem(TOKEN);
        localStorage.removeItem(PROFILE);
    }

    get token(): string {
        return this._token;
    }

    get profile(): IUserProfile {
        return this._profile;
    }

    isLoggedIn(): boolean {
        return !!this._token;
    }
}
