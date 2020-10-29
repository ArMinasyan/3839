const send = require('../helpers/Helper.Email');
const SecurePin = require('crypto-random-string');
const EmailConfirm = require('../models/EmailConfirm');
const { validationResult } = require('express-validator');
const User = require('../models/User');

module.exports.SendEmailPin = (req, res, next) => {
    const valid = validationResult(req);
    if (!valid.isEmpty()) res.json({ err: valid.array()[0] }); else {
        User.findOne({ email: req.body.email }).then(doc => {
            if (doc) res.json({ err: { msg: 'Email address already exist.' } }); else {
                const pin = SecurePin({ length: 6, type: 'numeric' });
                send(req.body.email, pin).then(sent => {
                    EmailConfirm.collection.insertOne({
                        email: req.body.email,
                        code: pin
                    }).then(inserted => {
                        res.send(sent);
                    })
                });
            }
        })
    }
}

module.exports.VerifyEmailPin = async (req, res, next) => {

    console.log(req.body);
    const valid = validationResult(req);
    if (!valid.isEmpty()) res.json({ err: valid.array()[0] }); else {
        EmailConfirm.find({ email: req.body.email }).then(docs => {

            if (docs) {
                if (docs[docs.length - 1].code === req.body.pin) res.status(200).json({ type: 'email', valid: true });
                else res.status(200).json({ type: 'email', valid: false })
            } else res.status(200).json({ err: "Email doesn't exist" })

        })
    }
}