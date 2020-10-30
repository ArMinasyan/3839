const { Router } = require('express');

const GetMainData = require('../controllers/User/Controller.GetMainData');
const { InsertProfileImg, InsertLogoImg } = require('../controllers/User/InsertProfileImg');
const { VerifyToken } = require('../helpers/Helper.Token');

const { profile, logo } = require('../helpers/Helper.Upload');

const route = Router();

route.get('/User/MainData', VerifyToken, GetMainData);
route.post('/User/InsertProfileImg', [VerifyToken, profile.single('profileImage')], InsertProfileImg);
route.post('/User/InsertLogoImg', [VerifyToken, logo.single('logoImage')], InsertLogoImg);
module.exports = route;