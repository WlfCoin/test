const express = require('express');
const router = express.Router();
const { processPayment } = require('../controllers/paymentController');

// مسیر پرداخت
router.post('/payment', processPayment);

module.exports = router;
