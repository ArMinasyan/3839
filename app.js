const express = require('express');
const mongoose = require('mongoose');
const { createServer } = require('http');
const body_parser = require('body-parser');
const cookie_parser = require('cookie-parser');
require('dotenv').config();

const app = express();

const HttpServer = createServer(app);

app.use(express.static(__dirname + '/public'));

let config = null;
if (process.env.NODE_ENV) config = require('./config.json').development;
else config = require('./config.json').production;


mongoose.connect(config.mongodb_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: true }));
app.use(cookie_parser());

const Auth = require('./routes/Auth');


app.use('/api', Auth);

const { VerifyToken } = require('./utils/Util.Token');

app.post('/test', VerifyToken, (req, res, next) => {
    res.send('Login');
})

app.get('/', (req, res, next) => {
    res.sendFile(__dirname + '/views/index.html');
})

app.get('/sign_up', (req, res, next) => {
    res.sendFile(__dirname + '/views/sign-like-therapist.html');
})

HttpServer.listen(8080, () => {
    console.log('Start');
})