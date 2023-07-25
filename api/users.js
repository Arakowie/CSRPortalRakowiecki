const express = require('express');
const usersRouter = express.Router();

const{
    Users
}=require('../db');

usersRouter.get('/', async (req, res, next) => {
    try {
        const users = await Users.getAllUsers();
        res.send({users});
    } catch ({name, message}) {
        next({name, message})
    }
});

usersRouter.get('/userByPhone', async (req, res, next) => {
    try {
        const user = await Users.getUserByPhoneNumber(req.body.phone_number);
        const info= {
           phone_number: req.body.phone_number
        }
        res.send(info);
        console.log("got user", user)
    } catch ({name, message}) {
        next({name, message})
    }
})

usersRouter.post('/createUser', async (req, res, next) => {
    console.log("req.body", req.body)
    const {first_name, last_name,phone_number,email,account_status} = req.body;
    try {
        const userNew = await Users.createUser(first_name, last_name,phone_number,email,account_status);
        res.send(userNew);
    } catch (error) {
        console.log(error)
    }
});

usersRouter.patch('/editUser', async (req, res, next) => {    
    const {userId} = req.params;
    const {first_name, last_name,phone_number,email,account_status} = req.body;
    const updateFields = {};

    if (first_name) {
        updateFields.first_name = first_name;
    }
    if (last_name) {
        updateFields.last_name = last_name;
    }
    if (phone_number) {
        updateFields.phone_number = phone_number;
    }
    if (email) {
        updateFields.email = email;
    }
    if (account_status) {
        updateFields.account_status = account_status;
    }


    try {
        const updatedUser = await  Users.updateUser(userId, updateFields);
        res.send(updatedUser);
    } catch ({name, message}) {
        next({name, message})
    }
});




module.exports = usersRouter