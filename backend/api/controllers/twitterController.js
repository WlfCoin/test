// twitterController.js
require("dotenv").config({ path: "/var/www/wolfcoin/.env" });
const axios = require("axios");

// Post a tweet
exports.postTweet = async (req, res) => {
    try {
        const { tweetContent, accessToken, accessTokenSecret } = req.body;

        if (!tweetContent || !accessToken || !accessTokenSecret) {
            return res.status(400).json({ success: false, message: "Tweet content and access tokens are required" });
        }

        const response = await axios.post(
            `https://api.twitter.com/2/tweets`,
            { text: tweetContent },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        res.status(200).json({ success: true, data: response.data });
    } catch (error) {
        console.error("Error posting tweet:", error);
        res.status(500).json({ success: false, message: "Server error while posting tweet" });
    }
};
