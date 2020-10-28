const { body } = require('express-validator');

module.exports.SendEmailPinValidator = [
    body('email').trim().notEmpty().withMessage('Email field is required.')
        .isEmail().withMessage('Please enter a valid email address.'),
]

module.exports.VerifyEmailPinValidator = [
    body('email').trim().notEmpty().withMessage('Email field is required.')
        .isEmail().withMessage('Please enter a valid email address.'),
    body('pin').trim().notEmpty().withMessage('Pin field is required')
        .isNumeric().withMessage('Please enter only digits.')
        .isLength({ min: 6, max: 6 }).withMessage('Please enter only 6 digits.'),
]

module.exports.SendPhonePinValidator = [
    body('phone').trim().notEmpty().withMessage('Phone number field is required.')
        .isMobilePhone().withMessage('Please enter a valid phone number.'),
]

module.exports.VerifyPhonePinValidator = [
    body('phone').trim().notEmpty().withMessage('Phone number field is required.')
        .isMobilePhone().withMessage('Please enter a valid phone number.'),
    body('pin').trim().notEmpty().withMessage('Pin field is required')
        .isNumeric().withMessage('Please enter only digits.')
        .isLength({ min: 6, max: 6 }).withMessage('Please enter only 6 digits.'),
]