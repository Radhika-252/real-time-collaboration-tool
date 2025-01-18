const express = require('express');
const { getMessages, createMessage } = require('../controllers/messageController');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

router.get('/', authMiddleware, getMessages);
router.post('/', authMiddleware, createMessage);

module.exports = router;
