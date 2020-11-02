const User = require('../../models/User');
const { validationResult } = require('express-validator');
const { VerifyHash } = require('../../helpers/Helper.Hash');
const { CreateToken, VerifyToken } = require('../../helpers/Helper.Token');

module.exports = async (req, res, next) => {
    const valid = validationResult(req);
    if (!valid.isEmpty()) res.json({ err: valid.array()[0].msg }); else {

        const { email, password } = req.body;

        User.findOne({ email: email }, (err, doc) => {

            if (err) throw new Error('Try Again');
            if (doc) {
                if (VerifyHash(password, doc.password)) {
                    res.cookie('token', CreateToken({ email: doc.email, id: doc._id }), {
                        httpOnly: true,
                        SameSite: 'Strict'
                    });
                    res.status(200).json({ login: true });
                } else res.status(200).json({ err: 'Incorrect email and/or password' })
            } else res.status(200).json({ err: 'Incorrect email and/or password' })
        })
    }

}