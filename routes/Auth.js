const { Router } = require('express');

const SignUp = require('../controllers/Controller.SignUp');
const SendPin = require('../controllers/Controller.SendPin');
const Validator_SignUp = require('../validators/Validator.SignUp');

const route = Router();

route.post('/auth/sign_up', Validator_SignUp, SignUp);
route.post('/auth/send_pin', SendPin);

module.exports = route;