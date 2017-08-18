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
    try {
        let _value = new Date().getTime() % 1000;
        await dataCtrl.postData({
            prop: util.makeDummyWord(),
            value: _value
        });
        res.end();
    } catch (err) {
        res.status(500).end();
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
    try {
        let _value = new Date().getTime() % 1000;
        await dataCtrl.postData({
            prop: util.makeDummyWord(),
            date: util.randomDate(new Date(2012, 0, 1), new Date()),
            value: _value
        });
        res.end();
    } catch (err) {
        res.status(500).end();
    }
});
