const express = require('express');
const router = express.Router();
const { connectWallet } = require('../controllers/walletController');

// مسیر اتصال به کیف پول
router.post('/connect', connectWallet);

module.exports = router;
