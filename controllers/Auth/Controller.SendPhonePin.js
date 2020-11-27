
const { SendPinCode, VerifyPinCode } = require('../../helpers/Helper.Phone');

const { validationResult } = require('express-validator');

module.exports.SendPhonePin = async (req, res, next) => {
    const valid = validationResult(req);
    if (!valid.isEmpty()) res.json({ err: valid.array()[0] }); else {
        const code_state = await SendPinCode(req.body.phone);
        res.status(200).json({
            valid: code_state.valid,
            status: code_state.status
        })
    }
}


module.exports.VerifyPhonePin = async (req, res, next) => {

    const valid = validationResult(req);
    if (!valid.isEmpty()) res.json({ err: valid.array()[0] }); else {
        const code_state = await VerifyPinCode(req.body.phone, req.body.pin);
        res.status(200).json({
            type: 'phone',
            valid: code_state.valid,
            
        })
    }
}

