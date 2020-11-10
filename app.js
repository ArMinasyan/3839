const express = require('express');
const mongoose = require('mongoose');
const {
    createServer
} = require('http');
const body_parser = require('body-parser');
const cookie_parser = require('cookie-parser');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

require('dotenv').config();
const app = express();

const HttpServer = createServer(app);

app.use(express.static(__dirname + '/public'));



app.use('/profileImages', express.static(__dirname + '/profileImages'));
app.use('/logoImages', express.static(__dirname + '/logoImages'));
app.set('views', __dirname + '/views');




let mongodb_url;
let secure_session = false;
if (process.env.NODE_ENV.trim() === 'development') mongodb_url = 'mongodb://localhost:27017/3839';
else {
    mongodb_url = process.env.MONGODB_URL;
    secure_session = true;
}

app.use(session({
    saveUninitialized: false,
    resave: false,
    secret: 'afsfsgsg262626267',
    store: new MongoDBStore({
        uri: mongodb_url,
        collection: 'session'
    }),
    cookie: {
        secure: secure_session,
        httpOnly: true,
        sameSite: true,
    }
}));


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
app.use(body_parser.urlencoded({
    extended: true
}));
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

const {
    VerifyToken
} = require('./helpers/Helper.Token');






const {
    createHmac
} = require('crypto');


///Main GET Routes

app.get('/', (req, res, next) => {
    if (req.session.user) res.status(200).redirect('/user');
    res.sendFile(__dirname + '/views/index.html');
})

app.get('/sign_up', (req, res, next) => {
    res.sendFile(__dirname + '/views/sign-like-therapist.html');
})

app.get('/user', VerifyToken, (req, res, next) => {
    res.sendFile(__dirname + '/views/account-page.html');
})

app.get('/logout', function (req, res) {
    res.clearCookie('token');
    res.clearCookie('connect.sid');
    req.session.destroy();
    res.status(200).redirect('/');
})



//Test routes

app.post('/test', VerifyToken, (req, res, next) => {
    res.send('Login');
})


app.get('/testHash/:value', (req, res, next) => {
    res.send(createHmac('SHA256', '7fd04df92f63').update(req.params.value).digest('hex'))
})


app.get('/client', (req, res, next) => {
    res.sendFile(__dirname + '/views/home-clients.html');
})

app.get('/therapist', (req, res, next) => {
    res.sendFile(__dirname + '/views/home-therapist.html');
})

app.get('/test', (req, res, next) => {
    res.sendFile(__dirname + '/views/test.html');
})



const arr = [
    'Depression',
    'Stress',
    'Anxiety',
    'Self-esteem',
    'Relationships',
    'Anger',
    'Grief'
];

const services_arr = {
    s1: ['Depression', 'Stress', 'Anxiety'],
    s2: ['Anxiety', 'Self-esteem', 'Relationships'],
    s3: ['Depression', 'Stress'],
    s4: ['Anxiety', 'Self-esteem', 'Anger', 'Grief'],
    s5: ['Self-esteem', 'Relationships']
}

const s = ['s1', 's2', 's3', 's4', 's5'];


const upd = require('./models/UserPageData');
const faker = require('faker');
const gender_arr = ['male', 'female'];
let data = [];
app.get('/testAdd', (req, res, next) => {
    let gender, fname, lname, services, email, phone;

    for (let i = 0; i < 5; i++) {
        gender = faker.random.arrayElement(gender_arr);
        fname = faker.name.firstName(gender);
        lname = faker.name.lastName(gender);
        email = faker.internet.email(fname, lname);
        phone = faker.phone.phoneNumber();
        services = services_arr[faker.random.arrayElement(s)];
        data.push({
            isClient: false,
            firstName: fname,
            lastName: lname,
            services: services,
            contact: {
                email: email,
                phone: phone
            }
        });
    }


    upd.insertMany(data).then(doc => {
        res.send('Inserted')
    })

})
app.listen(process.env.PORT || 8080, () => {
    console.log('localhost:8080');
})