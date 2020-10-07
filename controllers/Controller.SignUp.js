const User = require('../models/User');
const { validationResult } = require('express-validator');
const { CreateHash } = require('../utils/Util.Hash');
const SendEmail = require('../utils/Util.Email');
module.exports = (req, res, next) => {
    const valid = validationResult(req);
    if (!valid.isEmpty()) res.send(valid.array()[0].msg); else {
        const { email, password, country, phone_number, bussines_name, age, services } = req.body;
        User.findOne({ email: email }).then(result => {
            if (result === null) {
                const user = new User({
                    email: email,
                    password: CreateHash(password),
                    phone: phone_number,
                    country: country,
                    bussines_name: bussines_name,
                    age: age,
                    services: services
                });
                user.save(err => {
                    if (!err) res.send('Account successfully created.')
                })
            } else res.send('Email address already exist.')
        })
    }
}