// routes/messages.js
const express = require('express');
const router = express.Router();
const { getMessages, sendMessage } = require('../controllers/message.controller.js');
const {verifyToken}  = require('../middleware/userAuth.js');

router.get('/messages', verifyToken, getMessages);
router.post('/messages', verifyToken, sendMessage);

module.exports = router;

