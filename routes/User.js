const { Router } = require('express');

const GetMainData = require('../controllers/User/Controller.GetMainData');

const { VerifyToken } = require('../helpers/Helper.Token');


const route = Router();

route.get('/User/MainData', VerifyToken, GetMainData);


module.exports = route;