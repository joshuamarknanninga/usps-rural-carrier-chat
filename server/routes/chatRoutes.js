const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

router.get('/rooms', chatController.getChatRooms);
router.post('/message', chatController.postMessage);

module.exports = router;