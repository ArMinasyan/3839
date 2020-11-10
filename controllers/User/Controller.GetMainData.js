const UserPageData = require('../../models/UserPageData');


module.exports = (req, res, next) => {

    UserPageData.findOne({
            user_id: req.session.user.id
        })
        .select('country firstName lastName logoImgPath profileImgPath socialLinks contact description services').then(doc => {
            res.status(200).json({
                data: doc
            });
        })
}