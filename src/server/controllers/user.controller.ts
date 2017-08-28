import { Request, Response } from 'express';
import { UserModel as User, UserDocument } from '../models/user';
import { IUserParams } from '../types/IUserParams';
import { IUser } from '../types/IUser';

export class UserController {
    constructor() { }
    async getUser(params: IUserParams): Promise<UserDocument | null> {
        let user: UserDocument = await User.findOne(params).exec();
        if (!user)
            throw new Error('No user found');
        return user;
    }
    async createUser(newUser: IUser): Promise<void> {
        let user = new User(newUser);
        await user.save();
    }
    async editUser(params: IUserParams, editedUser: Object): Promise<void> {
        await User.findOneAndUpdate(params, editedUser).exec();
    }
}
