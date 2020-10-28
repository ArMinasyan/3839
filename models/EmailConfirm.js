const { model, Schema } = require('mongoose');

module.exports = model('email_confirm', new Schema({
    email: String,
    code: String,
    expireAt: {
        type: Date,
        default: Date.now,
        index: {
            expires: 600,
            background: true,
        }
    },
}));