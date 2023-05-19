const express = require('express')
const userCont = require('../controllers/user.controller.js')
const {signup, login} = userCont;
const userAuth = require('../middleware/userAuth.js')

const router = express.Router();

router.post('/signup', userAuth.saveUser, signup)

router.post('/login', login)

module.exports = router
