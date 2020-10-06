const express = require('express');
const mongoose = require('mongoose');
const { createServer } = require('http');
const body_parser = require('body-parser');
require('dotenv').config();

const app = express();

let HttpServer = createServer(app);

mongoose.connect('mongodb://localhost:27017/3839', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: true }));

const Auth = require('./routes/Auth');


app.use('/api', Auth);

HttpServer.listen(8080, () => {
    console.log('Start');
})