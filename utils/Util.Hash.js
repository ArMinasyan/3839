let { createHmac } = require('crypto');

const CreateHash = pswd => {
    return createHmac('SHA256', '7fd04df92f63').update(pswd).digest('hex');
}


const VerifyHash = (pswd1, pswd2) => {
    let hash = createHmac('SHA256', '7fd04df92f63').update(pswd1).digest('hex');
    return hash === pswd2 ? true : false;
}


module.exports = { CreateHash, VerifyHash }