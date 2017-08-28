import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { UserController } from '../controllers/user.controller';
import { CONFIG } from '../../config';
import { ILoginResponse } from '../types/ILoginResponse';
import { IUserParams } from '../types/IUserParams';
import { IUser } from '../types/IUser';

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

router.get('/api/users/:id', async (req: express.Request, res: express.Response): Promise<void> => {
    let params: IUserParams = {
        _id: req.params.id
    }
    try {
        let user = await userCtrl.getUser(params);
        user.password = undefined;
        res.json(user);
    } catch (err) {
        res.status(500).end();
    }
});

router.put('/api/users/:id', async (req: express.Request, res: express.Response): Promise<void> => {
    let token = req.headers['authorization'] as string;
    if (!token) {
        res.status(401).json({ message: 'No token provided.' });
    } else {
        try {
            let decoded: any = await jwt.verify(token, CONFIG.SECRET);
            console.log(decoded._id, req.params.id);
            if (decoded._id !== req.params.id) {
                return res.status(401).json({ message: 'Failed to authenticate token.' });
            }
            let params: IUserParams = {
                _id: decoded._id
            };
            (async () => {
                let editedUser: Object = undefined;
                try {
                    let hash = await bcrypt.hash(req.body.password, 10);
                    editedUser = {
                        password: hash
                    };
                    await userCtrl.editUser(params, editedUser);
                    res.end();
                } catch (err) {
                    res.status(500).end();
                }
            })();
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
                res.status(403).json({ success: false, message: failMsg });
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
            res.status(404).json({ success: false, message: failMsg });
        }
    } catch (err) {
        res.status(403).json({ success: false, message: failMsg });
    }
});
