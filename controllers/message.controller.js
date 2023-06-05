const db = require('../models')
const Message = db.messages
const User = db.users

exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.findAll();
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
};

exports.sendMessage = async (req, res) => {
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

exports.getMessagesForUser = async (req, res) => {
  try {
    const   userId  = req.params.id

    const messages = await Message.findAll({
      where: {
        or: [
          { senderId: userId },
          { receiverId: userId }
        ]
      },
      include: [
        { model: User, as: 'sender' },
        { model: User, as: 'receiver' }
      ]
    });

    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
};
