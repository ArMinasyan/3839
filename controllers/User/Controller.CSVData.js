const converter = require('json2csv');
const UserPageData = require('../../models/UserPageData');
const fs = require('fs');
module.exports = async (req, res, next) => {
    // const asyncParser = new json2csv.p({
    //     fields: ['First Name', 'Last Name', 'Country', 'Description', 'Services', 'Contact']
    // });

    const doc = await UserPageData.findOne({ user_id: req.session.user.id }).select('firstName lastName country description services contact.email contact.phone');
    converter.parseAsync(doc, {
        fields: [
            { label: 'First Name', value: 'firstName' },
            { label: 'Last Name', value: 'lastName' },
            { label: 'Country', value: 'country' },
            { label: 'Descritption', value: 'description' },
            { label: 'Services', value: 'services' },
            { label: 'Email', value: 'contact.email' },
            { label: 'Phone Number', value: 'contact.phone' }]
    }).then(csv => {
        res.status(200).json({
            filename: 'info_' + req.session.user.email.split('@')[0],
            csv: csv
        })
    })

}