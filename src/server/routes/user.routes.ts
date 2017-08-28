import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { UserController } from '../controllers/user.controller';
import { CONFIG } from '../../config';
import { ILoginResponse } from '../types/ILoginResponse';
import { IUserParams } from '../types/IUserParams';
import { IUser } from '../types/IUser';
import { IUserUpdate } from '../types/IUserUpdate';

const router = express.Router();

module.exports = router;

let userCtrl = new UserController();

router.post('/api/users', async (req: express.Request, res: express.Response): Promise<void> => {
    let user: IUser = undefined;
    try {
        let hash = await bcrypt.hash(req.body.password, 10);
        user = {
            email: req.body.email,
            password: hash
        };
        await userCtrl.createUser(user);
        res.end();
    } catch (err) {
        res.status(500).end();
    }
});

router.put('/api/users/password', async (req: express.Request, res: express.Response): Promise<void> => {
    let token = req.headers['authorization'] as string;
    if (!token) {
        res.status(401).json({ message: 'No token provided.' });
    } else {
        try {
            let decoded: any = await jwt.verify(token, CONFIG.SECRET);
            let params: IUserUpdate = {
                _id: decoded._id,
                oldPassword: req.body.oldPassword,
                newPassword: req.body.newPassword
            };
            await userCtrl.verifyPassword(params);
            res.json({ message: 'Password changed.' });
        } catch (err) {
            res.status(401).json({ message: 'Failed to authenticate token.' });
        }
    }
});

router.post('/api/users/auth', async (req: express.Request, res: express.Response): Promise<void> => {
    let failMsg = 'Authentication failed.';
    let params: IUserParams = {
        email: req.body.email
    }
    try {
        let user = await userCtrl.getUser(params);
        let userId = {
            _id: user._id
        };
        if (user) {
            let passOk = await bcrypt.compare(req.body.password, user.password);
            if (!passOk) {
                return res.status(403).json({ message: failMsg });
            } else {
                let token = jwt.sign(userId, CONFIG.SECRET, { expiresIn: '16h' });
                let loginResp: ILoginResponse = {
                    token: token,
                    profile: {
                        _id: user._id,
                        email: user.email
                    }
                };
                res.json(loginResp);
            }
        } else {
            res.status(404).json({ message: failMsg });
        }
    } catch (err) {
        res.status(403).json({ message: failMsg });
    }
});
