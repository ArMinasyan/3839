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
        const imgPath = 'profile_' + req.user.id + ext;
        UserPageData.findOneAndUpdate({ user_id: req.user.id }, { profileImgPath: imgPath }).then(updated => {

            if (updated.profileImgPath !== '' && fs.existsSync(path.resolve(process.cwd(), 'ProfileImages/' + updated.profileImgPath)))
                fs.unlinkSync(path.resolve(process.cwd(), 'ProfileImages/' + updated.profileImgPath));

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

        const imgPath = 'logo_' + req.user.id + ext;

        UserPageData.findOneAndUpdate({ user_id: req.user.id }, { logoImgPath: imgPath }).then(updated => {
            if (updated.logoImgPath !== '' && fs.existsSync(path.resolve(process.cwd(), 'LogoImages/' + updated.logoImgPath)))
                fs.unlinkSync(path.resolve(process.cwd(), 'LogoImages/' + updated.logoImgPath));

            cb(null, imgPath);
            req.user.logo_img = imgPath;
        });



    },
})

const filter = (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
        cb(null, true);
    } else {
        cb(null, false);
        req.user.error = 'Only .png, .jpg and .jpeg format allowed!';
    }
};


module.exports = {
    profile: multer({ storage: storage1, fileFilter: filter }),
    logo: multer({ storage: storage2, fileFilter: filter })
}