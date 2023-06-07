const db = require('../models')
const Message = db.messages
const { Op } = require("sequelize");
const User = db.users
const getMessages = async (req, res) => {
    try {
        const messages = await Message.findAll();
        res.json(messages);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch messages' });
    }
};

const sendMessage = async (req, res) => {
    try {
        const { senderId, receiverId, content } = req.body;

        // Create the message
        const message = await Message.create({
            senderId,
            receiverId,
            content,
        });

        res.status(201).json({ message: 'Message sent successfully', message });
    } catch (error) {
        res.status(500).json({ error: 'Failed to send message' });
    }
};

const getMessagesForUser = async (req, res) => {
    const { senderId, receiverId } = req.params;

    try {
        const messages = await Message.findAll({
            where: {
                [Op.and]: [
                    { senderId },
                    { receiverId },
                ],
            },
            include: [
                { model: User, as: 'sender' },
                { model: User, as: 'receiver' }
            ],
        });

        res.json(messages);

    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ error: error });
    }
};

module.exports = {
    getMessages,
    sendMessage,
    getMessagesForUser
}
