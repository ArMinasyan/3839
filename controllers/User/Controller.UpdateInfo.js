const UserPageData = require('../../models/UserPageData');


module.exports.Main = async (req, res, next) => {
    console.log(req.body.updated_data);
    UserPageData.findOneAndUpdate({
            user_id: req.session.user.id
        },
        req.body.updated_data,

    ).then(doc => {
        res.json({
            updated: true
        });
    })
}

module.exports.ChangeDescription = async (req, res, next) => {
    UserPageData.findOneAndUpdate({
        user_id: req.session.user.id
    }, {
        description: req.body.desc
    }).then(doc => {
        res.json({
            updated: true
        });
    })
}

module.exports.ChangeSocialLink = async (req, res, next) => {

    UserPageData.findOneAndUpdate({
        user_id: req.session.user.id
    }, {
        socialLinks: req.body.updated_links
    }).then(doc => {
        res.json({
            updated: true
        });
    })
}

module.exports.Services = async (req, res, next) => {

    UserPageData.findOneAndUpdate({
        user_id: req.session.user.id
    }, {
        services: req.body.data !== '' ? req.body.data.join() : ''
    }).then(result => {
        if (result) res.status(200).json({
            updated: true
        });
    })
}