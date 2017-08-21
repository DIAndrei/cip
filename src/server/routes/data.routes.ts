import * as express from 'express';
import { DataController } from '../controllers/data.controller';
import { Util } from '../util/util';
import { IDataParams } from '../types/IDataParams';

const router = express.Router();
const dataCtrl = new DataController();
const util = new Util();

module.exports = router;

router.get('/api/data/bar', async (req: express.Request, res: express.Response): Promise<void> => {
    let query: IDataParams = {
        date: { $exists: false }
    }
    try {
        let data = await dataCtrl.getData(query);
        res.json(data);
    } catch (err) {
        res.status(500).end();
    }
});

router.post('/api/data/bar', async (req: express.Request, res: express.Response): Promise<void> => {
    let type: string = req.query.type;
    let num: number = req.query.num;
    for (let i = 0; i < num; i++) {
        try {
            await dataCtrl.postData({
                prop: type,
                value: util.randomNumber(100, i)
            });
            res.end();
        } catch (err) {
            res.status(500).end();
        }
    }
});

router.get('/api/data/line', async (req: express.Request, res: express.Response): Promise<void> => {
    let query: IDataParams = {
        date: { $exists: true }
    }
    try {
        let data = await dataCtrl.getData(query);
        res.json(data);
    } catch (err) {
        res.status(500).end();
    }
});

router.post('/api/data/line', async (req: express.Request, res: express.Response): Promise<void> => {
    let type: string = req.query.type;
    let num: number = req.query.num;
    for (let i = 0; i < num; i++) {
        try {
            await dataCtrl.postData({
                prop: type,
                date: util.randomDate(new Date(2017, 1, 1), i),
                value: util.randomNumber(100, i)
            });
            res.end();
        } catch (err) {
            res.status(500).end();
        }
    }
});
