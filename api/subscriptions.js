const express = require('express');
const subsRouter = express.Router();

const{
    Subscriptions
}=require('../db');

subsRouter.get('/', async (req, res, next) => {
    try {
        const subs = await Subscriptions.getAllSubs();
        res.send({subs});
    } catch ({name, message}) {
        next({name, message})
    }
});

subsRouter.post('/createSub', async (req, res, next) => {
    const {user_id, make, model} = req.body;
    try {
        const subNew = await Subscriptions.createSub(user_id, make, model);
        res.send(subNew);
    } catch ({name, message}) {
        next({name, message})
    }
});


module.exports = subsRouter