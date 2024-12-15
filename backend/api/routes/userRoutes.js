const express = require('express');
const Boost = require('../models/boostModel');

const router = express.Router();

// بازگرداندن پلن‌های فعال کاربر
router.get('/boosts', async (req, res) => {
    const userId = req.query.userId; // دریافت کاربر از کوئری
    try {
        const boosts = await Boost.find({ userId });
        const miningRate = boosts.filter(b => b.type === 'mining').reduce((sum, b) => sum + b.value, 0.5);
        const offlineDuration = boosts.filter(b => b.type === 'offline').reduce((sum, b) => sum + b.value, 4);

        res.json({ success: true, miningRate, offlineDuration });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
