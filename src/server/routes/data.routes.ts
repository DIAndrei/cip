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
        report: req.query.report
    }
    try {
        let data = await dataCtrl.getData(query);
        res.json(data);
    } catch (err) {
        res.status(500).end();
    }
});

router.post('/api/data/bar', async (req: express.Request, res: express.Response): Promise<void> => {
    let name: string = req.query.name;
    let num: number = req.query.num;
    let report: string = req.query.report;
    for (let i = 0; i < num; i++) {
        try {
            await dataCtrl.postData({
                prop: name,
                date: new Date(),
                value: util.randomNumber(100, i),
                report: report || 'default'
            });
            res.end();
        } catch (err) {
            res.status(500).end();
        }
    }
});

router.get('/api/data/line', async (req: express.Request, res: express.Response): Promise<void> => {
    let query: IDataParams = {
        report: req.query.report
    }
    try {
        let data = await dataCtrl.getLineData(query);
        res.json(data);
    } catch (err) {
        res.status(500).end();
    }
});

router.post('/api/data/line', async (req: express.Request, res: express.Response): Promise<void> => {
    let name: string = req.query.name;
    let num: number = req.query.num;
    let report: string = req.query.report;
    for (let i = 0; i < num; i++) {
        try {
            await dataCtrl.postData({
                prop: name,
                date: util.randomDate(new Date(2017, 1, 1), i),
                value: util.randomNumber(100, i),
                report: report || 'default'
            });
            res.end();
        } catch (err) {
            res.status(500).end();
        }
    }
});
