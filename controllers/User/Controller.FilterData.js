const UserPageData = require('../../models/UserPageData');

module.exports = (req, res, next) => {

    console.log(req.body.data);
    UserPageData.find({
            services: {
                $in: req.body.data
            }
        })
        .select('country firstName lastName contact').then(doc => {
            console.log(doc.length);
            res.status(200).json({
                data: doc
            });
        })
}