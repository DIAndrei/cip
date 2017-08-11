import * as express from 'express';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import * as path from 'path';

// mongoose.connect("mongodb://localhost");

let app = express();

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../node_modules')));
app.use(express.static(path.join(__dirname, './client')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './client/index.html'));
});

const port =  3000;

app.on('listening', onListening);
app.listen(port); 

function onListening(): void {
    console.log(`Listening on port `+ port);
}

