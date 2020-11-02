const { model, Schema, SchemaTypes } = require('mongoose');

module.exports = model('UserPageData', new Schema({
    user_id: SchemaTypes.ObjectId,
    firstName: {
        type: String,
        default: ''
    },
    lastName: {
        type: String,
        default: ''
    },
    country: String,
    phone: String,
    bussines_name: String,
    age: Number,
    services: String,
    session_format: String,
    age_speciality: Number,
    //
    socialLinks: [{
        name: String,
        link: String
    }],
    profileImgPath: {
        type: String,
        default: ''
    },
    logoImgPath: {
        type: String,
        default: ''
    },
    description: String,
    invoices: [{}]
}));