const {
    model,
    Schema
} = require('mongoose');

module.exports = model('user', new Schema({

    email: String,
    password: String,
    customer:Boolean,
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'UserPageData'
    }
}))