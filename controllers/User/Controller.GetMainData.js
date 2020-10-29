const UserPageData = require('../../models/UserPageData');


module.exports = (req, res, next) => {
    UserPageData.findOne({ user_id: res.locals.id }).then(doc => {
        res.status(200).json({ data: doc });
    })
}