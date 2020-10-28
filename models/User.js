const { model, Schema } = require('mongoose');

module.exports = model('user', new Schema({
    
    email: String,
    password: String,
    
}))