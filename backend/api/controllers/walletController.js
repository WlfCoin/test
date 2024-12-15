// walletController.js
const User = require("../../models/userModel");

// Get wallet details for the user
exports.getWalletDetails = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({
            success: true,
            walletAddress: user.walletAddress || null,
        });
    } catch (error) {
        console.error("Error fetching wallet details:", error);
        res.status(500).json({ success: false, message: "Server error while fetching wallet details" });
    }
};

// Update wallet address for the user
exports.updateWallet = async (req, res) => {
    try {
        const { walletAddress } = req.body;

        if (!walletAddress) {
            return res.status(400).json({ success: false, message: "Wallet address is required" });
        }

        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        user.walletAddress = walletAddress;
        await user.save();

        res.status(200).json({
            success: true,
            message: "Wallet updated successfully",
            walletAddress: user.walletAddress,
        });
    } catch (error) {
        console.error("Error updating wallet:", error);
        res.status(500).json({ success: false, message: "Server error while updating wallet" });
    }
};

// Link wallet to the user account
exports.linkWallet = async (req, res) => {
    try {
        const { walletAddress } = req.body;

        if (!walletAddress) {
            return res.status(400).json({ success: false, message: "Wallet address is required" });
        }

        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (user.walletAddress) {
            return res.status(400).json({ success: false, message: "Wallet is already linked" });
        }

        user.walletAddress = walletAddress;
        await user.save();

        res.status(201).json({ success: true, message: "Wallet linked successfully", walletAddress });
    } catch (error) {
        console.error("Error linking wallet:", error);
        res.status(500).json({ success: false, message: "Server error while linking wallet" });
    }
};
