import * as express from 'express';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import * as morgan from 'morgan';
import { CONFIG } from './config';

const port: number = process.env.PORT || 3000;
const app = express();

(<any>mongoose).Promise = global.Promise;
(async () => {
    try {
        await mongoose.connect(CONFIG.DB);
    } catch (err) {
        console.trace(err);
    }
})();

app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../node_modules')));
app.use(express.static(path.join(__dirname, './client')));
app.use(express.static(path.join(__dirname, '../')));

app.use(require('./server/routes/data.routes'));
app.use(require('./server/routes/user.routes'));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './client/index.html'));
});

app.listen(port, () => {
    console.log(`App available at :${port}`);
});
