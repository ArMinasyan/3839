const jwt = require('jsonwebtoken');
const fs = require('fs');

const CreateToken = data => jwt.sign(data, process.env.JWT_KEY, { algorithm: 'HS384' });

const VerifyToken = (req, res) => {
    console.log(req.cookies);
    if (req.cookies && req.cookies.token) {
        jwt.verify(req.cookies.token, fs.readFileSync('./keys/Public.key'), { algorithms: ['RS512'] },
            function (err, dec) {
                if (err || dec === undefined) res.status(401).redirect('/user');
                else res.status(401).redirect('/')
            })
    } else res.status(401).redirect('/user');
}

module.exports = { CreateToken, VerifyToken }