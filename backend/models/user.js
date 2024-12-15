const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    username: { type: String },
    points: { type: Number, default: 10 }, // امتیازات کاربر
    toncoin: { type: Number, default: 0 }, // موجودی تون کوین
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", userSchema);
