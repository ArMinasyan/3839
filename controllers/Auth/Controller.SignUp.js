const User = require('../../models/User');
const UserPageData = require('../../models/UserPageData');

const Stripe = require('stripe').Stripe;
const stripe = new Stripe(process.env.STRIPE_TEST_PRIVATE);

const {
    validationResult
} = require('express-validator');
const {
    CreateHash
} = require('../../helpers/Helper.Hash');
const {
    CreateToken
} = require('../../helpers/Helper.Token');


module.exports = async (req, res, next) => {
    const valid = validationResult(req);
    if (!valid.isEmpty()) res.json({
        err: valid.array()[0]
    });
    else {
        const {
            email,
            password,
            country,
            phone,
            bussines_name,
            age,
            services,
            firstName,
            lastName,
            customer
        } = req.body;


        const user = new User({
            email: email,
            password: CreateHash(password),
            customer: customer
        });

        const SCustomer = await stripe.customers.create({
            name: firstName + ' ' + lastName,
            email: email
        });


        user.save(err => {
            if (!err) {
                const userPageData = new UserPageData({
                    user_id: user._id,
                    stripe_customer_id: SCustomer.id,
                    firstName: firstName,
                    lastName: lastName,
                    contact: {
                        phone: phone,
                        email: email
                    },
                    country: country,
                    bussines_name: bussines_name,
                    age: age,
                    services: ''
                })
                userPageData.save(err => {
                    if (!err) {
                        res.cookie('token', CreateToken({
                            id: user._id,
                            email: user.email,
                            date: Date.now(),
                            path: user.customer ? '/customer' : '/therapist'
                        }), {
                            httpOnly: true
                        });
                        res.status(200).json({
                            customer: customer
                        });
                    }
                })
            }
        })
    }


}