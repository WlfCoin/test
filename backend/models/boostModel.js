const mongoose = require('mongoose');

const BoostSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    rateIncrease: { type: Number, required: true }, // افزایش نرخ استخراج
    offlineDuration: { type: Number, required: true }, // مدت زمان آفلاین
    endTime: { type: Date, required: true }, // زمان انقضای بوستر
    active: { type: Boolean, default: true }, // وضعیت فعال بودن
});

module.exports = mongoose.model('Boost', BoostSchema);
