const phone = require('../utils/Util.Phone');
const SecurePin = require('secure-pin');
const { SendPinCode, VerifyPinCode } = require('../utils/Util.Phone');
const charSet = new SecurePin.CharSet();
charSet.addNumeric().randomize();

let sendCode = (req, res, next) => {
    const pin = SecurePin.generateStringSync(6, charSet);
    SendPinCode('+37477822856');
}


let verifyCode = (req, res, next) => {
    VerifyPinCode('+37477822856', req.body.code)
}

module.exports = { sendCode, verifyCode }