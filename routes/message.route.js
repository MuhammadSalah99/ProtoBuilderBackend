// routes/messages.js
const express = require('express');
const router = express.Router();
const messagesCont = require('../controllers/message.controller.js')
const { getMessages, sendMessage, getMessagesForUser } = messagesCont 

router.get('/messages',  messagesCont.getMessages);
router.post('/messages',  messagesContsendMessage);
router.get('/messages/:userId', messagesCont.getMessagesForUser);
module.exports = router;

