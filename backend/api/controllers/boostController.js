const Boost = require('../../models/boostModel');
const Transaction = require('../../models/transactionModel');
const User = require('../../models/user');
const { validateTransaction } = require('../../services/paymentService');

// خرید بوستر
exports.purchaseBoost = async (req, res) => {
    const { userId, boostId, transactionId } = req.body;

    try {
        // اعتبارسنجی تراکنش با Toncoin
        const isValid = await validateTransaction(transactionId);
        if (!isValid) {
            return res.status(400).json({ success: false, error: 'Invalid transaction.' });
        }

        // یافتن بوستر
        const boost = await Boost.findById(boostId);
        if (!boost) {
            return res.status(404).json({ success: false, error: 'Boost not found.' });
        }

        // ذخیره تراکنش
        const transaction = new Transaction({
            userId,
            type: 'boost',
            amount: boost.price,
            status: 'completed'
        });
        await transaction.save();

        // به‌روزرسانی کاربر
        const user = await User.findById(userId);
        user.rateIncrease = boost.rateIncrease;
        user.offlineDuration = boost.offlineDuration;
        user.boostActiveUntil = boost.endTime;
        await user.save();

        // پاسخ نهایی
        res.status(200).json({
            success: true,
            transaction,
            userData: {
                rateIncrease: user.rateIncrease,
                offlineDuration: user.offlineDuration,
                boostActiveUntil: user.boostActiveUntil
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server error.' });
    }
};
