const {
    model,
    Schema,
    SchemaTypes
} = require('mongoose');

module.exports = model('UserPageData', new Schema({
    user_id: SchemaTypes.ObjectId,
    isClient: Boolean,
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
    contact: String,
    services: [],
    session_format: String,
    age_speciality: Number,
    //
    socialLinks: {
        instagram: {
            type: String,
            default: ''
        },
        facebook: {
            type: String,
            default: ''
        },
        linkedin: {
            type: String,
            default: ''
        },
        twitter: {
            type: String,
            default: ''
        },
    },
    profileImgPath: {
        type: String,
        default: ''
    },
    logoImgPath: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        default: ''
    },
    invoices: [{}]
}));