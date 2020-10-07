const { body } = require('express-validator');

module.exports = [
    body('email').trim().notEmpty().withMessage('Email field is required.')
        .normalizeEmail().isEmail().withMessage('Please enter a valid email address.'),

    body('password').trim().notEmpty().withMessage('Pasword field is required.')
        .isLength({ min: 8 }).withMessage('Please enter at least 8 characters.'),
]