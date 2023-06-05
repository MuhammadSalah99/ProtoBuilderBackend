const db = require('.../models')
const Message = db.messages


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
