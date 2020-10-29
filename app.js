const express = require('express');
const mongoose = require('mongoose');
const { createServer } = require('http');
const body_parser = require('body-parser');
const cookie_parser = require('cookie-parser');
const jwt = require('express-jwt');

require('dotenv').config();

const app = express();

const HttpServer = createServer(app);

app.use(express.static(__dirname + '/public'));

let mongodb_url;
if (process.env.NODE_ENV) mongodb_url = 'mongodb://localhost:27017/3839';
else mongodb_url = process.env.MONGODB_URL;


mongoose.connect(config.mongodb_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: true }));
app.use(cookie_parser());

const Auth = require('./routes/Auth');


app.use('/api', Auth);

const { VerifyToken } = require('./Helpers/Helper.Token');

app.post('/test', VerifyToken, (req, res, next) => {
    res.send('Login');
})

app.get('/', (req, res, next) => {
    if (VerifyToken(req, res)) res.status(200).redirect('/user');
})

app.get('/sign_up', (req, res, next) => {
    res.sendFile(__dirname + '/views/sign-like-therapist.html');
})


app.get('/user', jwt({ secret: process.env.JWT_KEY, }), (req, res, next) => {
    //if (VerifyToken(req, res)) res.sendFile(__dirname + '/views/account-page.html');
})

HttpServer.listen(8080 || process.env.PORT, () => {
    console.log('Start');
})