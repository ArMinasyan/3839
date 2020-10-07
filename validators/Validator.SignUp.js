const { body } = require('express-validator');

module.exports = [
    body('username').trim().notEmpty().withMessage('Username field is required.'),

    body('email').trim().notEmpty().withMessage('Email field is required.')
        .isEmail().withMessage('Please enter a valid email address.'),

    body('password').trim().notEmpty().withMessage('Pasword field is required.')
        .isLength({ min: 8 }).withMessage('Please enter at least 8 characters.'),

    body('confirm_password').trim().notEmpty().withMessage('Confirm pasword field is required.')
        .custom((value, { req }) => { if (value !== req.body.password) throw new Error('Password confirmation does not match password.'); else return true }),

    body('country').trim().notEmpty().withMessage('Country field is required.'),

    body('pin').trim().notEmpty().withMessage('Pin field is required')
        .isNumeric().withMessage('Please enter only digits.')
        .isLength({ min: 6, max: 6 }).withMessage('Please enter only 6 digits.'),

    body('phone_number').trim().notEmpty().withMessage('Phone number field is required.')
        .isMobilePhone('any').withMessage('Enter correct phone number.'),

    body('bussines_name').trim().notEmpty().withMessage('Bussines name field is required.'),

    body('age').trim().notEmpty().withMessage('Age field is required.')
        .isNumeric().withMessage('Please enter only digits.'),

    body('services').trim().notEmpty().withMessage('Services field is required.')
]