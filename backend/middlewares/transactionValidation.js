const { validateTransaction } = require('../../services/paymentService');

module.exports.validateTransaction = async (req, res, next) => {
    try {
        const isValid = await validateTransaction(req.body.transactionId);
        if (!isValid) {
            return res.status(400).json({ success: false, error: 'Invalid transaction.' });
        }
        next();
    } catch (error) {
        console.error('Transaction validation error:', error);
        res.status(500).json({ success: false, error: 'Server error during transaction validation.' });
    }
};
