const { Router } = require('express');

const GetMainData = require('../controllers/User/Controller.GetMainData');
const { Main, ChangeDescription, ChangeSocialLink } = require('../controllers/User/Controller.UpdateInfo')
const { InsertProfileImg, InsertLogoImg } = require('../controllers/User/Controller.InsertProfileImg');
const { VerifyToken } = require('../helpers/Helper.Token');

const { profile, logo } = require('../helpers/Helper.Upload');

const route = Router();

route.get('/User/MainData', VerifyToken, GetMainData);
route.post('/User/UpdateMainInfo', VerifyToken, Main);
route.post('/User/UpdateDescription', VerifyToken, ChangeDescription);
route.post('/User/UpdateSocialLinks', VerifyToken, ChangeSocialLink);
route.post('/User/InsertProfileImg', [VerifyToken, profile.single('profileImage')], InsertProfileImg);
route.post('/User/InsertLogoImg', [VerifyToken, logo.single('logoImage')], InsertLogoImg);
module.exports = route;