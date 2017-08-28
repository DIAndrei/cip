import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import { DataController } from '../controllers/data.controller';
import { Util } from '../util/util';
import { CONFIG } from '../../config';
import { IDataParams } from '../types/IDataParams';

const router = express.Router();
const dataCtrl = new DataController();
const util = new Util();

module.exports = router;

router.use('/api/data', async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    let token = req.headers['authorization'] as string;
    if (!token) {
        res.status(401).json({ message: 'No token provided.' });
    } else {
        try {
            let decoded = await jwt.verify(token, CONFIG.SECRET);
            (<any>req).decoded = decoded;
            next();
        } catch (err) {
            res.status(401).json({ message: 'Failed to authenticate token.' });
        }
    }
});

router.get('/api/data/bar', async (req: express.Request, res: express.Response): Promise<void> => {
    let query: IDataParams = {
        report: req.query.report,
        owner: (<any>req).decoded._id
    }    
    try {
        let data = await dataCtrl.getData(query);
        res.json(data);
    } catch (err) {
        res.status(500).end();
    }
});

router.get('/api/data/line', async (req: express.Request, res: express.Response): Promise<void> => {
    let query: IDataParams = {
        report: req.query.report,
        owner: (<any>req).decoded._id
    }    
    try {
        let data = await dataCtrl.getLineData(query);
        res.json(data);
    } catch (err) {
        res.status(500).end();
    }
});

router.post('/api/data', async (req: express.Request, res: express.Response): Promise<void> => {
    let name: string = req.query.name;
    let num: number = req.query.num;
    let report: string = req.query.report;
    for (let i = 0; i < num; i++) {
        try {
            await dataCtrl.postData({
                prop: name,
                date: util.randomDate(new Date(2017, 1, 1), i),
                value: util.randomNumber(100, i),
                report: report || 'default',
                owner: (<any>req).decoded._id
            });
            res.end();
        } catch (err) {
            res.status(500).end();
        }
    }
});
