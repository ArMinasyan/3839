const multer = require('multer');
const multerS3 = require('multer-s3');

const fs = require('fs');
const UserPageData = require('../models/UserPageData');
const path = require('path');

const AWS = require('aws-sdk');



AWS.config.update({
    accessKeyId: process.env.DOSpacesAccessKeyId,
    secretAccessKey: process.env.DOSpacesSecretAccessKey
});

const spacesEndpoint1 = new AWS.Endpoint('fra1.digitaloceanspaces.com/ProfileImages');
const spacesEndpoint2 = new AWS.Endpoint('fra1.digitaloceanspaces.com/LogoImages');

const s3_1 = new AWS.S3({
    endpoint: spacesEndpoint1
});


const s3_2 = new AWS.S3({
    endpoint: spacesEndpoint2
});

const filter = (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
        cb(null, true);
    } else {
        cb(null, false);
        req.session.user.error = 'Only .png, .jpg and .jpeg format allowed!';
    }
};


const profileImage = multer({
    storage: multerS3({
        s3: s3_1,
        bucket: 'therapybubbleimages',
        acl: 'public-read',
        key: function (req, file, cb) {
            const ext = path.extname(file.originalname);
            const imgPath = 'profile_' + req.session.user.id + ext;
            UserPageData.findOneAndUpdate({
                user_id: req.session.user.id
            }, {
                profileImgPath: imgPath
            }).then(updated => {
                cb(null, imgPath);
                req.session.user.profile_img = imgPath;
            })

        }
    }),
    fileFilter: filter
});

const logoImage = multer({
    storage: multerS3({
        s3: s3_2,
        bucket: 'therapybubbleimages',
        acl: 'public-read',
        key: function (req, file, cb) {
            const ext = path.extname(file.originalname);
            const imgPath = 'logo_' + req.session.user.id + ext;
            UserPageData.findOneAndUpdate({
                user_id: req.session.user.id
            }, {
                logoImgPath: imgPath
            }).then(updated => {
                cb(null, imgPath);
                req.session.user.logo_img = imgPath;
            })

        }
    }),
    fileFilter: filter
});


module.exports = { profileImage, logoImage }
