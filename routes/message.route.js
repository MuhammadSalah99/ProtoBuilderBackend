// routes/messages.js
const express = require('express');
const router = express.Router();
const { getMessages, sendMessage } = require('../controllers/message.controller.js');
const {verifyToken}  = require('../middleware/userAuth.js');

router.get('/messages',  getMessages);
router.post('/messages',  sendMessage);

module.exports = router;

