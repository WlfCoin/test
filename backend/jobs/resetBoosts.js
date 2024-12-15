// Import dependencies
const cron = require('node-cron');
const Boost = require('../models/boostModel'); // مدل بوسترها
const User = require('../models/user'); // مدل کاربران

// Reset expired boosts function
const resetExpiredBoosts = async () => {
    try {
        const now = new Date();
        
        // Fetch expired boosts
        const expiredBoosts = await Boost.find({ endTime: { $lt: now }, active: true });

        if (expiredBoosts.length === 0) {
            console.log('No expired boosts to reset.');
            return;
        }

        // Process all expired boosts in parallel
        await Promise.all(
            expiredBoosts.map(async (boost) => {
                const user = await User.findById(boost.userId);
                if (user) {
                    // Adjust mining rate with a minimum threshold of 0
                    user.miningRate = Math.max(user.miningRate - 1, 0);
                    await user.save();
                }
                // Deactivate boost
                boost.active = false;
                await boost.save();
            })
        );

        console.log(`Reset ${expiredBoosts.length} expired boosts successfully.`);
    } catch (error) {
        console.error('Error resetting expired boosts:', error);
    }
};

// Schedule cron job
cron.schedule('0 * * * *', resetExpiredBoosts); // Run every hour

module.exports = resetExpiredBoosts;
