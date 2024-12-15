// bonusController.js
require("dotenv").config({ path: "/var/www/wolfcoin/.env" });
const Bonus = require("../../models/bonusModel");
const User = require("../../models/userModel");

// Get bonuses for a user
exports.getBonuses = async (req, res) => {
    try {
        const { userId } = req.query;

        if (!userId) {
            return res.status(400).json({ success: false, message: "User ID is required" });
        }

        const bonuses = await Bonus.find({ userId });

        if (!bonuses.length) {
            return res.status(404).json({ success: false, message: "No bonuses found" });
        }

        res.status(200).json({ success: true, data: bonuses });
    } catch (error) {
        console.error("Error fetching bonuses:", error);
        res.status(500).json({ success: false, message: "Server error while fetching bonuses" });
    }
};
