import { UserModel as User, UserDocument } from '../models/user';
import { IUserParams } from '../types/IUserParams';
import { IUser } from '../types/IUser';
import { IUserUpdate } from '../types/IUserUpdate';
import * as bcrypt from 'bcrypt';

export class UserController {
    constructor() { }
    async getUser(params: IUserParams): Promise<UserDocument | null> {
        let user: UserDocument = await User.findOne(params).exec();
        if (!user)
            throw new Error('No user found.');
        return user;
    }
    async createUser(newUser: IUser): Promise<void> {
        let user = new User(newUser);
        await user.save();
    }
    async editUser(params: IUserParams, editedUser: Object): Promise<void> {
        await User.findOneAndUpdate(params, editedUser).exec();
    }
    async verifyPassword(params: IUserUpdate): Promise<void> {
        let userId: IUserParams = {
            _id: params._id
        }
        let user = await this.getUser(userId)
        let passOk = await bcrypt.compare(params.oldPassword, user.password);
        if (!passOk) {
            throw new Error('Wrong password.');
        } else {
            let userToEdit: Object = undefined;
            let hash = await bcrypt.hash(params.newPassword, 10);
            userToEdit = {
                password: hash
            };
            await this.editUser(userId, userToEdit);
        }
    }
}
