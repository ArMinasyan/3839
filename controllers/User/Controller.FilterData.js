const UserPageData = require('../../models/UserPageData');

module.exports = (req, res, next) => {

    UserPageData.find({
            services: {
                $in: req.body.data
            }
        })
        .select('country firstName lastName contact').then(doc => {
          
            res.status(200).json({
                data: doc
            });
        })
}