const express = require('express')
const db = require('../models')

const User = db.users;


const saveUser = async(req, res, next)=> {
    try  {
        const userName = await User.findOne({
            where: {
                userName: req.body.userName
            }
        });

        if (userName) {
            return res.json(409).send("username is already taken")
        }

        const emailCheck = await User.findOne({
            where: {
                email: req.body.email
            }
        });

        if (emailCheck) {
            return res.json(409).send("Email is alrady taked")
        }
        next();
    }
    catch(error){
        console.log(error)
    }

};

module.exports = {
    saveUser,
};
    
