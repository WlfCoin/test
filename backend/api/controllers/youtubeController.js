const { google } = require("googleapis");
const youtube = google.youtube("v3");

exports.checkYoutubeSubscription = async (req, res) => {
    const { userToken } = req.body; // توکن کاربر

    try {
        const response = await youtube.subscriptions.list({
            part: "snippet",
            mine: true,
            auth: userToken // باید از سمت کاربر گرفته شود
        });

        const subscribedToProject = response.data.items.some((sub) => sub.snippet.resourceId.channelId === "PROJECT_CHANNEL_ID");

        if (subscribedToProject) {
            res.status(200).json({ success: true, message: "User is subscribed." });
        } else {
            res.status(403).json({ success: false, message: "User is not subscribed." });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Error checking subscription." });
    }
};
