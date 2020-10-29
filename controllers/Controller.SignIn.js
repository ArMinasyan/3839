const User = require('../models/User');
const { validationResult } = require('express-validator');
const { VerifyHash } = require('../Helpers/Helper.Hash');
const { CreateToken, VerifyToken } = require('../Helpers/Helper.Token');
module.exports = async (req, res, next) => {
    const valid = validationResult(req);
    if (!valid.isEmpty()) res.json({ err: valid.array()[0].msg }); else {
        const { email, password } = req.body;
        User.findOne({ email: email }, (err, doc) => {
            if (err) throw new Error('Try Again');
            if (doc) {
                if (VerifyHash(password, doc.password)) {
                    // res.send(CreateToken({ _id: doc._id, time: Date.now() }));
                    res.cookie('token', CreateToken({ email: doc.email, id: doc._id }));
                    res.redirect('/user');
                } else res.status(501).send('Incorrect email and/or password')
            } else res.status(501).send('Incorrect email and/or password')
        })
    }

}