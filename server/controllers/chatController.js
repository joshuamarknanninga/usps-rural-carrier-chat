const ChatModel = require('../models/ChatModel');

exports.getChatRooms = async (req, res) => {
  try {
    const rooms = await ChatModel.find();
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch chat rooms' });
  }
};

exports.postMessage = async (req, res) => {
  const { roomId, message, user } = req.body;

  try {
    const newMessage = new ChatModel({
      roomId,
      message,
      user,
      timestamp: new Date(),
    });

    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: 'Failed to post message' });
  }
};