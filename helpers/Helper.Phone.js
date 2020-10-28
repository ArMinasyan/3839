const twilio = require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

let SendPinCode = (to) => {
    return twilio.verify.services(process.env.TWILIO_VERIFY_TOKEN).verifications.create({ to: to, channel: 'sms' });
}

let VerifyPinCode = async (to, code) => {
    return twilio.verify.services(process.env.TWILIO_VERIFY_TOKEN).verificationChecks.create({ to: to, code: code });
}



module.exports = { SendPinCode, VerifyPinCode };