import * as mongoose from 'mongoose';
import { PassResetModel as Pass, PassResetDocument } from '../models/passReset';
import { IPassReset } from '../types/IPassReset';

export class PassResetController {
    constructor() { }

    async createToken(tokenDoc: IPassReset) {
        let token = new Pass(tokenDoc);
        return await token.save();
    }

    async getToken(params) {
        let token: PassResetDocument = await Pass.findOne(params).exec();
        if (!token)
            throw new Error('No token found.');
        return token;
    }

    async deleteToken(tokenId: string) {
        await Pass.findByIdAndRemove(tokenId).exec();
    }

}
