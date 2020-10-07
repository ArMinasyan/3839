const twilio = require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

let SendPinCode = (to) => {
    twilio.verify.services(process.env.TWILIO_VERIFY_TOKEN).verifications.create({ to: to, channel: 'sms' }).then(value => {
        console.log(value);

    })
}

let VerifyPinCode = (to, code) => {
    twilio.verify.services(process.env.TWILIO_VERIFY_TOKEN).verificationChecks.create({ to: to, code: code }).then(value => {
        console.log(value);
    })
}


module.exports = { SendPinCode, VerifyPinCode };