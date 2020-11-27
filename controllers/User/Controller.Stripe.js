const UserPageData = require('../../models/UserPageData');

const Stripe = require('stripe').Stripe;
const stripe = new Stripe(process.env.STRIPE_TEST_PRIVATE);

module.exports.addCard = async (req, res, next) => {
    stripe.tokens.create({
        card: {
            number
        }
    })
    const doc = await UserPageData.findOne({ user_id: req.session.user.id });
    const card = await stripe.customers.createSource(doc.stripe_customer_id, { source: req.body.token_id });

    const data = {
        id: card,
        exp_month: card.exp_month,
        exp_year: card.exp_year,
        last4: card.last4,
        brand: card.brand
    };

    if (card.id) res.json({ data: data });
}

module.exports.getCardList = async (req, res, next) => {
    const doc = await UserPageData.findOne({ user_id: req.session.user.id });
    const cardsList = await stripe.customers.listSources(doc.stripe_customer_id, { object: 'card' });

    let data = [];
    cardsList.data.forEach(elem => {
        data.push({
            id: elem.id,
            exp_month: elem.exp_month,
            exp_year: elem.exp_year,
            last4: elem.last4,
            brand: elem.brand
        })
    })
    res.status(200).send(cardsList.data);
}

module.exports.deleteCard = async (req, res, next) => {
    const doc = await UserPageData.findOne({ user_id: req.session.user.id });
    const cardDelete = await stripe.customers.deleteSource(doc.stripe_customer_id, req.body.id);

    res.status(200).json({ deleted: cardDelete.deleted });
}