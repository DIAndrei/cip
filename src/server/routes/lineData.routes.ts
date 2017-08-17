import * as express from 'express';
import { DataController } from '../controllers/lineData.controller';
import { Util } from '../util/util';

const router = express.Router();
const lineDataCtrl = new DataController();
const util = new Util();

module.exports = router;

router.get('/api/data/line', async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        let data = await lineDataCtrl.getData();
        res.json(data);
    } catch (err) {
        res.status(500).end();
    }
});

router.post('/api/data/line', async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        let _value = new Date().getTime() % 1000;
        await lineDataCtrl.postData({
            prop: util.makeDummyWord(),
            date: util.randomDate(new Date(2012, 0, 1), new Date()),
            value: _value
        });
        res.status(200).end();
    } catch (err) {
        res.status(500).end();
    }
});
