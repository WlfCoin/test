const express = require('express');
const router = express.Router();
const { purchaseBoost } = require('../controllers/boostController');
const { validateTransaction } = require('../middlewares/transactionValidation');

router.post('/purchase', validateTransaction, purchaseBoost);

module.exports = router;
