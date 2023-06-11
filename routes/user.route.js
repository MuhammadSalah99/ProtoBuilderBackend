const express = require('express')
const userCont = require('../controllers/user.controller.js')
const {signup, login, editUser, getUserById, getAllUsers} = userCont;
const userAuth = require('../middleware/userAuth.js')

const router = express.Router();

router.post('/signup', signup)

router.post('/login', login)

router.put('/edit/:userId', editUser)


;
router.get('/', getAllUsers) 

router.get('/:userId', getUserById) 
 
module.exports = router 
