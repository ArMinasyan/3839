const { Router } = require('express');

const SignUp = require('../controllers/Controller.SignUp');
const SignIn = require('../controllers/Controller.SignIn');
const { SendEmailPin, VerifyEmailPin } = require('../controllers/Controller.SendEmailPin');
const { SendPhonePin, VerifyPhonePin } = require('../controllers/Controller.SendPhonePin');

const Validator_SignUp = require('../validators/Validator.SignUp');
const Validator_SignIn = require('../validators/Validator.SignIn');
const { SendEmailPinValidator, VerifyEmailPinValidator,
    SendPhonePinValidator, VerifyPhonePinValidator } = require('../validators/Validator.SendPin');

const route = Router();

route.post('/auth/sign_up', Validator_SignUp, SignUp);
route.post('/auth/sign_in', Validator_SignIn, SignIn);

route.post('/auth/send_pin_email', SendEmailPinValidator, SendEmailPin);
route.post('/auth/verify_pin_email', VerifyEmailPinValidator, VerifyEmailPin);

route.post('/auth/send_pin_phone', SendPhonePinValidator, SendPhonePin);
route.post('/auth/verify_pin_phone', VerifyPhonePinValidator, VerifyPhonePin);


module.exports = route;