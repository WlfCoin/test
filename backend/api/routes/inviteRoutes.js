const express = require('express');
const router = express.Router();
const { getInvitedFriends, getInviteLink } = require('../controllers/inviteController');
const { authMiddleware } = require('../middlewares/authMiddleware'); // احراز هویت

router.get('/friends', authMiddleware, getInvitedFriends); // بررسی احراز هویت
router.get('/link', authMiddleware, getInviteLink); // بررسی احراز هویت

module.exports = router;
