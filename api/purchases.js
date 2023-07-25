const express = require('express');
const purchaseRouter = express.Router();

const{
    Purchases
}=require('../db');

purchaseRouter.get('/', async (req, res, next) => {
    try {
        const purchases = await Purchases.getAllPurchases();
        res.send({purchases});
    } catch ({name, message}) {
        next({name, message})
    }
});

purchaseRouter.post('/createPurchase', async (req, res, next) => {
    const {sub_id, purchase_date, purchase_price} = req.body;
    try {
        const purchNew = await Subscriptions.createSub(sub_id, purchase_date, purchase_price);
        res.send(purchNew);
    } catch ({name, message}) {
        next({name, message})
    }
});


module.exports = purchaseRouter