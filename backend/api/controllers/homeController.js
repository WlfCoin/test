// homeController.js
require("dotenv").config();
const User = require("../../models/userModel");
const Miner = require("../../models/minerModel");

// Get user mining details
exports.getUserData = async (req, res) => {
    try {
        const { userId } = req.query;
        if (!userId) {
            return res.status(400).json({ success: false, message: "User ID is required" });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const miner = await Miner.findOne({ userId });
        if (!miner) {
            return res.status(404).json({ success: false, message: "Miner details not found" });
        }

        res.status(200).json({
            success: true,
            data: {
                username: user.username,
                miningRate: miner.miningRate,
                totalPoints: user.points,
                active: miner.active,
            },
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
};
