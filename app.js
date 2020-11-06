const express = require('express');
const mongoose = require('mongoose');
const { createServer } = require('http');
const body_parser = require('body-parser');
const cookie_parser = require('cookie-parser');


require('dotenv').config();
const app = express();

const HttpServer = createServer(app);

app.use(express.static(__dirname + '/public'));
app.use('/profileImages', express.static(__dirname + '/profileImages'));
app.use('/logoImages', express.static(__dirname + '/logoImages'));
app.set('views', __dirname + '/views');







let mongodb_url;
if (process.env.NODE_ENV.trim() === 'development') mongodb_url = 'mongodb://localhost:27017/3839';
else mongodb_url = process.env.MONGODB_URL;



mongoose.connect(mongodb_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(con => {
    console.log('Database connected...');
}).catch(err => {
    console.log(err);
});



app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: true }));
app.use(cookie_parser());



const Auth = require('./routes/Auth');
const User = require('./routes/User');

app.use('/api', [Auth, User]);

const cors = require('cors');

cors({
    origin: [
        'https://test-3839.herokuapp.com/'
    ]
});

const { VerifyToken } = require('./helpers/Helper.Token');

app.post('/test', VerifyToken, (req, res, next) => {
    res.send('Login');
})



app.get('/', (req, res, next) => {
    if (req.cookies && req.cookies.token) res.redirect('/user'); else
        res.sendFile(__dirname + '/views/index.html');
})

const { createHmac } = require('crypto');

// app.get('/test', (req, res, next) => {
//     res.send(createHmac('SHA256', '7fd04df92f63').update('test.112025@gmail.com').digest('hex'))
// })

app.get('/sign_up', (req, res, next) => {
    res.sendFile(__dirname + '/views/sign-like-therapist.html');
})


app.get('/user', VerifyToken, (req, res, next) => {
    res.sendFile(__dirname + '/views/account-page.html');
})

app.get('/client',  (req, res, next) => {
    res.sendFile(__dirname + '/views/home-clients.html');
})

app.get('/therapist',  (req, res, next) => {
    res.sendFile(__dirname + '/views/home-therapist.html');
})

app.get('/test', (req, res, next) => {
    res.sendFile(__dirname + '/views/test.html');
})
app.listen(process.env.PORT || 8080, () => {
    console.log('localhost:8080');
})