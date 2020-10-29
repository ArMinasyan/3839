const express = require('express');
const mongoose = require('mongoose');
const { createServer } = require('http');
const body_parser = require('body-parser');
const cookie_parser = require('cookie-parser');

require('dotenv').config();

const app = express();

const HttpServer = createServer(app);

app.use(express.static(__dirname + '/public'));

let mongodb_url;
if (process.env.NODE_ENV) mongodb_url = process.env.MONGODB_URL;
else mongodb_url = 'mongodb://localhost:27017/3839';

mongoose.connect(mongodb_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: true }));
app.use(cookie_parser());

const Auth = require('./routes/Auth');


app.use('/api', Auth);

const { VerifyToken } = require('./helpers/Helper.Token');

app.post('/test', VerifyToken, (req, res, next) => {
    res.send('Login');
})

app.get('/', (req, res, next) => {
    if (VerifyToken(req, res)) res.status(200).redirect('/user');
})

app.get('/sign_up', (req, res, next) => {
    res.sendFile(__dirname + '/views/sign-like-therapist.html');
})


app.get('/user', (req, res, next) => {
    res.sendFile(__dirname + '/views/account-page.html');
    //if (VerifyToken(req, res)) 
})

HttpServer.listen(8080 || process.env.PORT, () => {
    console.log('Start');
})