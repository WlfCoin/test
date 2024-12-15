const mongoose = require("mongoose");

const bonusSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    activeDays: { type: Number, default: 0 }, // تعداد روزهای فعال
    lastClaimed: { type: Date } // تاریخ آخرین دریافت بونوس
});

module.exports = mongoose.model("Bonus", bonusSchema);
