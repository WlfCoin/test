const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    type: { type: String, enum: ["boost", "bonus", "wallet"], required: true }, // نوع تراکنش
    amount: { type: Number, required: true }, // مقدار تراکنش
    status: { type: String, enum: ["pending", "completed", "failed"], default: "pending" }, // وضعیت تراکنش
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Transaction", transactionSchema);
