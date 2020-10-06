const { model } = require('mongoose');

module.exports = model('user', {
    first_name: {
        type: String,
        default: ''
    },
    last_name: {
        type: String,
        default: ''
    },
    email: String,
    password: String,
    country: String,
    phone: String,
    bussines_name: String,
    age: Number,
    services: String
})