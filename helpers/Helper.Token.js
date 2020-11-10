const jwt = require('jsonwebtoken');
const fs = require('fs');
const {
    nextTick
} = require('process');



const CreateToken = data => jwt.sign(data, process.env.JWT_KEY, {
    algorithm: 'HS384'
});



const VerifyToken = (req, res, next) => {
    if (req.cookies && req.cookies.token) {
        jwt.verify(req.cookies.token, process.env.JWT_KEY, {
                algorithms: ['HS384']
            },
            function (err, dec) {
                if (err || dec === undefined) res.status(401).redirect('/');
                else {
                    req.session.user = dec;
                    next();
                }
            })
    } else res.status(401).redirect('/');
}

module.exports = {
    CreateToken,
    VerifyToken
}