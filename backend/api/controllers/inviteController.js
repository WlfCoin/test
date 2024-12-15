const User = require('../models/user'); // مدل کاربر
const Invite = require('../models/invite'); // مدل دعوت‌ها

exports.getInviteLink = async (req, res) => {
    try {
        const userId = req.user.id; // آیدی کاربر از سیستم احراز هویت
        const botUsername = 'YourBotUsername'; // نام کاربری ربات تلگرام
        const inviteLink = `https://t.me/${botUsername}?start=${userId}`;
        res.json({ inviteLink });
    } catch (error) {
        console.error("Error generating invite link:", error);
        res.status(500).json({ error: "Failed to generate invite link" });
    }
};

exports.getInvitedFriends = async (req, res) => {
    try {
        const userId = req.user.id; // آیدی کاربر
        const invitedFriends = await Invite.find({ inviter: userId }); // اطلاعات دوستان دعوت‌شده از پایگاه داده

        // محاسبه پاداش‌ها
        const friends = invitedFriends.map(friend => ({
            name: friend.name,
            reward: 2, // هر دعوت موفق ۲ امتیاز
        }));

        res.json({ friends });
    } catch (error) {
        console.error("Error fetching invited friends:", error);
        res.status(500).json({ error: "Failed to fetch invited friends" });
    }
};
