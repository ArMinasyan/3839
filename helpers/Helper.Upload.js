const multer = require('multer');
const fs = require('fs');
const UserPageData = require('../models/UserPageData');
const path = require('path');
const storage1 = multer.diskStorage({
    destination: function (req, file, cb) {

        const PATH = path.resolve(process.cwd(), 'ProfileImages');


        if (fs.existsSync(PATH)) cb(null, PATH);
        else {
            fs.mkdirSync(PATH);
            cb(null, PATH)
        }
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);

        let date_now = Date.now();
        const imgPath = 'profile_' + req.user.id + ext;
        UserPageData.updateOne({ user_id: req.user.id }, { profileImgPath: imgPath }).then(updated => {
            cb(null, imgPath);
            req.user.profile_img = imgPath;
        });

    },
})


const storage2 = multer.diskStorage({
    destination: function (req, file, cb) {

        const PATH = path.resolve(process.cwd(), 'LogoImages');
        if (fs.existsSync(PATH)) cb(null, PATH);
        else {
            fs.mkdirSync(PATH);
            cb(null, PATH)
        }
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);

        let date_now = Date.now();
        const imgPath = 'logo_' + req.user.id + ext;
        UserPageData.updateOne({ user_id: req.user.id }, { logoImgPath: imgPath }).then(updated => {
            cb(null, imgPath);
            req.user.logo_img = imgPath;
        });

    },
})

module.exports = {
    profile: multer({ storage: storage1 }),
    logo: multer({ storage: storage2 })
}