import { IUserProfile } from './IUserProfile';

export interface ILoginResponse {
    token: string,
    profile: IUserProfile
}
