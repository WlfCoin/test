const mongoose = require("mongoose");

const walletSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    walletAddress: { type: String, required: true, unique: true }, // آدرس کیف پول کاربر
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Wallet", walletSchema);
