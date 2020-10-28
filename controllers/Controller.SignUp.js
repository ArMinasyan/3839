const User = require('../models/User');
const UserPageData = require('../models/UserPageData');

const { validationResult } = require('express-validator');
const { CreateHash } = require('../Helpers/Helper.Hash');
const { CreateToken } = require('../Helpers/Helper.Token');

const SendEmail = require('../Helpers/Helper.Email');
module.exports = (req, res, next) => {
    const valid = validationResult(req);
    if (!valid.isEmpty()) res.json({ err: valid.array()[0] }); else {

        const { email, password, country, phone_number, bussines_name, age, services, firstName, lastName } = req.body;
        // User.findOne({ email: email }).then(result => {
        //  if (result === null) {
        console.log('Registration');

        const user = new User({
            email: email,
            password: CreateHash(password),
        });
        user.save(err => {
            if (!err) {
                const userPageData = new UserPageData({
                    user_id: user._id,
                    firstName: firstName,
                    lastName: lastName,
                    phone: phone_number,
                    country: country,
                    bussines_name: bussines_name,
                    age: age,
                    services: services
                })
                userPageData.save(err => {
                    if (!err) res.status(200).json({ token: CreateToken({ id: result._id, email: result.email, date: new Date.now() }) })
                })
            }
            //})
            // } else res.send('Email address already exist.')
        })
    }
}