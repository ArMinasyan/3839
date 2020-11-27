const {
    Router
} = require('express');

const GetMainData = require('../controllers/User/Controller.GetMainData');
const FilterData = require('../controllers/User/Controller.FilterData');
const CSVData = require('../controllers/User/Controller.CSVData');
const { addCard, getCardList, deleteCard } = require('../controllers/User/Controller.Stripe');
const {
    Main,
    ChangeDescription,
    ChangeSocialLink,
    Services
} = require('../controllers/User/Controller.UpdateInfo')
const {
    InsertProfileImg,
    InsertLogoImg
} = require('../controllers/User/Controller.InsertProfileImg');


const {
    profile,
    logo
} = require('../helpers/Helper.Upload');

const route = Router();



route.get('/User/MainData', GetMainData);
route.post('/User/UpdateMainInfo', Main);
route.post('/User/UpdateDescription', ChangeDescription);
route.post('/User/UpdateSocialLinks', ChangeSocialLink);
route.post('/User/InsertProfileImg', profile.single('profileImage'), InsertProfileImg);
route.post('/User/InsertLogoImg', logo.single('logoImage'), InsertLogoImg);
route.post('/User/Services', Services);
route.post('/User/Filter', FilterData);
route.get('/User/CSVData', CSVData);

route.post('/User/AddCard', addCard);
route.get('/User/CardsList', getCardList);
route.post('/User/DeleteCard', deleteCard);

module.exports = route;