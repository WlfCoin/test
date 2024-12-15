// telegramController.js
require("dotenv").config({ path: "/var/www/wolfcoin/.env" });
const axios = require("axios");

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.ADMIN_ID;

// Verify Telegram membership
exports.verifyMembership = async (req, res) => {
    try {
        const { telegramUsername } = req.body;

        if (!telegramUsername) {
            return res.status(400).json({ success: false, message: "Telegram username is required" });
        }

        const response = await axios.get(
            `https://api.telegram.org/bot${BOT_TOKEN}/getChatMember?chat_id=${CHAT_ID}&user_id=${telegramUsername}`
        );
        const isMember = response.data && response.data.result && response.data.result.status !== "left";

        if (!isMember) {
            return res.status(403).json({ success: false, message: "User is not a member of the Telegram group" });
        }

        res.status(200).json({ success: true, message: "User is a member of the Telegram group" });
    } catch (error) {
        console.error("Error verifying Telegram membership:", error);
        res.status(500).json({ success: false, message: "Server error while verifying Telegram membership" });
    }
};

// Send a message to the Telegram group
exports.sendMessage = async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ success: false, message: "Message content is required" });
        }

        await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            chat_id: CHAT_ID,
            text: message,
        });

        res.status(200).json({ success: true, message: "Message sent successfully" });
    } catch (error) {
        console.error("Error sending message to Telegram group:", error);
        res.status(500).json({ success: false, message: "Server error while sending message" });
    }
};
