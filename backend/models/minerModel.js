const mongoose = require("mongoose");

const minerSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    rate: { type: Number, default: 0.5 }, // نرخ استخراج
    accumulatedPoints: { type: Number, default: 10 }, // امتیازهای استخراج شده
    lastMiningTime: { type: Date, default: Date.now } // آخرین زمان فعالیت
});

module.exports = mongoose.model("Miner", minerSchema);
