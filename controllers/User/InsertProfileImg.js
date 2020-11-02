const upload = require('../../helpers/Helper.Upload');

module.exports.InsertProfileImg = (req, res, next) => {
    // upload.single('profile_img');
    res.status(200).json({ profile_img: req.user.profile_img });
}

module.exports.InsertLogoImg = (req, res, next) => {
    res.status(200).json({ logo_img: req.user.logo_img });
}