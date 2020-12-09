const express = require('express');
const mongoose = require('mongoose');
const {
    createServer
} = require('http');
const body_parser = require('body-parser');
const cookie_parser = require('cookie-parser');
const session = require('express-session');
const csrf = require('csurf');
const cors = require('cors');


require('dotenv').config();
const app = express();

const HttpServer = createServer(app);

app.use(express.static(__dirname + '/public'));



app.use('/profileImages', express.static(__dirname + '/profileImages'));
app.use('/logoImages', express.static(__dirname + '/logoImages'));
app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');


//const development = process.argv.pop();
const development = false;

let mongodb_url;
if (development) {
    mongodb_url = 'mongodb://localhost:27017/3839';

} else {
    mongodb_url = process.env.MONGODB_URL;

}

app.use(session({
    saveUninitialized: false,
    resave: false,
    secret: 'afsfsgsg262626267',
    cookie: {
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

const {
    VerifyToken
} = require('./helpers/Helper.Token');

const csrfDefender = csrf({
    cookie: {
        httpOnly: true,
        sameSite: true
    }
});

app.use('/api', csrfDefender, VerifyToken, [User]);
app.use(csrfDefender, Auth);


app.use(cors({
    origin: [
        'https://id-3839.herokuapp.com/'
    ]
}));

const {
    createHmac
} = require('crypto');


///Main GET Routes

app.get('/csrf', (req, res, next) => {
    res.status(200).json({
        csrf: req.csrfToken()
    });


})

app.get('/', (req, res, next) => {
    if (req.session.user) res.status(200).redirect(req.session.user.path);
    else res.sendFile(__dirname + '/views/index.html');
})

app.get('/sign_in', (req, res, next) => {
    res.status(200).sendFile(__dirname + '/views/sign-like-therapist.html');
})

app.get('/customer', csrfDefender, VerifyToken, (req, res, next) => {
    if (req.session.user.path == req.path) res.sendFile(__dirname + '/views/dashboard.html');
    else res.redirect(req.session.user.path);
})

app.get('/therapist', csrfDefender, VerifyToken, (req, res, next) => {
    if (req.session.user.path == req.path) res.status(200).sendFile(__dirname + '/views/account-page.html');
    else res.redirect(req.session.user.path);
})

app.get('/logout', function (req, res) {
    res.clearCookie('token');
    res.clearCookie('_csrf');
    res.clearCookie('connect.sid');
    req.session.destroy();
    res.status(200).redirect('/');
})



//Test routes

app.post('/test', VerifyToken, (req, res, next) => {
    res.send('Login');
})

////_________________________STRIPE_____________________________

app.get('/create_stripe_customer/:email', (req, res, next) => {

    stripe.customers.create({ email: req.params.email }).then(created => {
        console.log('-----------------------------', created);
    })
})


// stripe.customers.createSource('123',{
//     source:{
//         car
//     }
// })

app.post('/add_card_stripe', async (req, res) => {


    // const cardDetails = {
    //     number: req.body.number,
    //     exp_month: req.body.exp_month,
    //     exp_year: req.body.exp_year,
    //     cvc: req.body.cvc,
    //     name: req.body.name
    // }
    //cus_IOpWeXSIgLP9RH
    //tok_1Ho2OkAiy3fjkRxKdrJahj9Z
    //tok_1Ho2Q1Aiy3fjkRxKPAN4wrMU
    // const cardToken = await stripe.tokens.create({
    //     card: cardDetails
    // })

    const card = await stripe.customers.createSource(req.params.id, { source: req.body.token_id });


    console.log('----------------------------------', card)
})
// app.get('/create_stripe_invoice/:customer_id', async (req, res, next) => {
//     const invoice = await stripe.invoices.create({

//         customer: req.params.customer_id,
//         metadata: {
//             am
//         }
//     });

//     console.log(invoice);
// })

//////_____________________________________-------------------------
app.get('/testHash/:value', (req, res, next) => {
    res.send(createHmac('SHA256', '7fd04df92f63').update(req.params.value).digest('hex'))
})


app.get('/client', (req, res, next) => {
    res.sendFile(__dirname + '/views/dashboard.html');
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

});

HttpServer.listen(process.env.PORT || 8080, () => {
    console.log('localhost:8080');
})