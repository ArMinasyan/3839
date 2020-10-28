const jwt = require('jsonwebtoken');
const fs = require('fs');

const CreateToken = data => jwt.sign(data, fs.readFileSync('./keys/Private.key'), { algorithm: 'RS512' });

const VerifyToken = (req, res, next) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        jwt.verify(req.headers.authorization.split(' ')[1], fs.readFileSync('./keys/Public.key'), { algorithms: ['RS512'] },
            function (err, dec) {
                if (err || dec === undefined) res.status(401).send('Invalid token');
                else next();
            })
    } else if (req.query && req.query.token) {
        jwt.verify(req.query.token, fs.readFileSync('./keys/Public.key'), { algorithms: ['RS512'] },
            function (err, dec) {
                if (err || dec === undefined) res.status(401).send('Invalid token');
                else next();
            })
    } else if (req.cookies && req.cookies.token) {
        jwt.verify(req.cookies.token, fs.readFileSync('./keys/Public.key'), { algorithms: ['RS512'] },
            function (err, dec) {
                if (err || dec === undefined) res.status(401).send('Invalid token');
                else next();
            })
    } else res.status(401).send('Token is missing');
}

module.exports = { CreateToken, VerifyToken }