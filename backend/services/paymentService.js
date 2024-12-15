// File Path: backend/services/paymentService.js

const TonWeb = require('tonweb');

// تنظیم TonWeb برای اتصال به شبکه Toncoin
const tonweb = new TonWeb();

// آدرس کیف پول از فایل .env
const walletAddress = process.env.TON_WALLET_ADDRESS;

// تأیید تراکنش در شبکه Toncoin
async function validateTransaction(transactionId) {
    try {
        // در اینجا تراکنش از شبکه Toncoin بررسی می‌شود
        const transaction = await tonweb.getTransaction(transactionId);
        if (!transaction) {
            return false; // تراکنش یافت نشد
        }
        return transaction.status === 'completed'; // بررسی وضعیت تراکنش
    } catch (error) {
        console.error('Error validating transaction:', error);
        return false;
    }
}

// ارسال تراکنش
async function sendTransaction(amount, toAddress) {
    try {
        const transaction = await tonweb.sendTransaction({
            from: walletAddress,
            to: toAddress,
            value: amount
        });
        return transaction;
    } catch (error) {
        console.error('Error sending transaction:', error);
        throw new Error('Failed to send transaction');
    }
}

module.exports = { validateTransaction, sendTransaction };
