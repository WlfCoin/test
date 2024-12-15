const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    taskId: { type: String, required: true },
    name: { type: String, required: true },
    reward: { type: Number, required: true }, // پاداش هر ماموریت
    completedUsers: { type: [String], default: [] } // کاربران تکمیل‌کننده
});

module.exports = mongoose.model
