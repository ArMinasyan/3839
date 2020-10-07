const { Router } = require('express');

const SignUp = require('../controllers/Controller.SignUp');
const SignIn = require('../controllers/Controller.SignIn');
const SendPinEmail = require('../controllers/Controller.SendEmailPin');
const { sendCode, verifyCode } = require('../controllers/Controller.SendPhonePin');

const Validator_SignUp = require('../validators/Validator.SignUp');
const Validator_SignIn = require('../validators/Validator.SignIn');

const route = Router();

route.post('/auth/sign_up', Validator_SignUp, SignUp);
route.post('/auth/sign_in', Validator_SignIn, SignIn);
route.post('/auth/send_pin_email', SendPinEmail);

route.post('/auth/send_pin_phone', sendCode);
route.post('/auth/verify_pin_phone', verifyCode);


module.exports = route;