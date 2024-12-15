// instagramController.js
require("dotenv").config({ path: "/var/www/wolfcoin/.env" });
const axios = require("axios");

// Post Instagram content
exports.postInstagramContent = async (req, res) => {
    try {
        const { accessToken, content } = req.body;

        if (!accessToken || !content) {
            return res.status(400).json({ success: false, message: "Access token and content are required" });
        }

        const response = await axios.post(
            `https://graph.instagram.com/me/media?access_token=${accessToken}`,
            { content }
        );

        res.status(200).json({ success: true, data: response.data });
    } catch (error) {
        console.error("Error posting to Instagram:", error);
        res.status(500).json({ success: false, message: "Server error while posting to Instagram" });
    }
};
