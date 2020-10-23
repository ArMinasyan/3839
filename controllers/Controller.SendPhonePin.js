const phone = require('../utils/Util.Phone');
const SecurePin = require('secure-pin');
const { SendPinCode, VerifyPinCode } = require('../utils/Util.Phone');
const charSet = new SecurePin.CharSet();
charSet.addNumeric().randomize();

let sendCode = async (req, res, next) => {
    const code_state = await SendPinCode(req.body.phone_number);
    res.status(200).json({
        valid: code_state.valid,
        status: code_state.status
    })
}


let verifyCode = async (req, res, next) => {
    const code_state = await VerifyPinCode(req.body.phone_number, req.body.code);
    res.status(200).json({
        valid: code_state.valid,
        status: code_state.status
    })
}

module.exports = { sendCode, verifyCode }