const send = require('../utils/Util.Email');
const SecurePin = require('secure-pin');
const charSet = new SecurePin.CharSet();
charSet.addNumeric().randomize();

module.exports = (req, res, next) => {
    const pin = SecurePin.generateStringSync(6, charSet);
    send(req.body.email, pin).then(sent => {
        res.send(sent);
    });
}
