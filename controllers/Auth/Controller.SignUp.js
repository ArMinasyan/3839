const User = require('../../models/User');
const UserPageData = require('../../models/UserPageData');

const {
    validationResult
} = require('express-validator');
const {
    CreateHash
} = require('../../helpers/Helper.Hash');
const {
    CreateToken
} = require('../../helpers/Helper.Token');


module.exports = (req, res, next) => {
    const valid = validationResult(req);
    if (!valid.isEmpty()) res.json({
        err: valid.array()[0]
    });
    else {
        console.log(req.body);

        const {
            email,
            password,
            country,
            phone,
            bussines_name,
            age,
            services,
            firstName,
            lastName
        } = req.body;

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
                    contact: {
                        phone: phone,
                        email: email
                    },
                    country: country,
                    bussines_name: bussines_name,
                    age: age,
                    services: services
                })
                userPageData.save(err => {
                    if (!err) {
                        res.cookie('token', CreateToken({
                            id: user._id,
                            email: user.email,
                            date: Date.now()
                        }), {
                            httpOnly: true
                        });
                        res.status(200).end();
                    }
                })
            }
        })
    }


}