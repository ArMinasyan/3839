const UserPageData = require('../../models/UserPageData');


module.exports = (req, res, next) => {

    UserPageData.findOne({ user_id: req.user.id })
        .select('country firstName lastName logoImgPath profileImgPath socialLinks phone description').then(doc => {
            res.status(200).json({ data: doc });
        })
}