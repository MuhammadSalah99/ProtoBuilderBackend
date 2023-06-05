// routes/messages.js
const express = require('express');
const router = express.Router();
const { getMessages, sendMessage, getMessagesForUser } = require('../controllers/message.controller.js');

router.get('/messages',  getMessages);
router.post('/messages',  sendMessage);
router.get('/users/:userId/messages', getMessagesForUser);
module.exports = router;

