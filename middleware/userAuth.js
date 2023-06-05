const express = require('express')
const db = require('../models')
const jwt = require('jsonwebtoken');

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

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  jwt.verify(token, 'your_secret_key', async (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    const user = await User.findByPk(decoded.userId);

    if (!user) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    req.user = user;

    next();
  });
};

module.exports = {
    saveUser,
    verifyToken
};
    
