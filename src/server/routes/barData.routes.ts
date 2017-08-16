import * as express from 'express';
import { DataController } from '../controllers/barData.controller'
const router = express.Router();
const barDataCtrl = new DataController();

module.exports = router;

router.get('/api/data/bar', async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        let data = await barDataCtrl.getData();
        res.json(data);
    } catch (err) {
        res.status(500).end();
    }
});

router.post('/api/data/bar', async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        let _value = new Date().getTime() % 1000;
        await barDataCtrl.postData({
            attr: makeDummyWord(),
            value: _value
        });
        res.status(200).end();
    } catch (err) {
        res.status(500).end();
    }
});

function makeDummyWord() {
    let text: string = '';
    const ALPHABET: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (let i = 0; i < 5; i++) {
        text += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length));
    }
    return text;
}