const UserPageData = require('../../models/UserPageData');


module.exports.Main = async (req, res, next) => {
    UserPageData.findOneAndUpdate({ user_id: req.user.id }, req.body.updated_data).then(doc => {
        res.json({ updated: true });
    })
}

module.exports.ChangeDescription = async (req, res, next) => {
    UserPageData.findOneAndUpdate({ user_id: req.user.id }, { description: req.body.desc }).then(doc => {
        res.json({ updated: true });
    })
}

module.exports.ChangeSocialLink = async (req, res, next) => {

    UserPageData.findOneAndUpdate({ user_id: req.user.id }, {
        socialLinks: req.body.updated_links
    }).then(doc => {
        res.json({ updated: true });
    })
}