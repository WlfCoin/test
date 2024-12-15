// paymentController.js
require("dotenv").config({ path: "/var/www/wolfcoin/.env" });
const db = require("../db");

// Process a payment
exports.processPayment = async (req, res) => {
    try {
        const { userId, amount, method } = req.body;

        if (!userId || !amount || !method) {
            return res.status(400).json({ success: false, message: "User ID, amount, and payment method are required" });
        }

        const user = await db.query("SELECT * FROM users WHERE id = $1", [userId]);
        if (!user.rows.length) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        await db.query(
            "INSERT INTO payments (user_id, amount, method, status) VALUES ($1, $2, $3, $4)",
            [userId, amount, method, "Pending"]
        );

        res.status(201).json({ success: true, message: "Payment processed successfully" });
    } catch (error) {
        console.error("Error processing payment:", error);
        res.status(500).json({ success: false, message: "Server error while processing payment" });
    }
};

// Get payment history for a user
exports.getPaymentHistory = async (req, res) => {
    try {
        const userId = req.user.id;

        const payments = await db.query("SELECT * FROM payments WHERE user_id = $1", [userId]);

        if (!payments.rows.length) {
            return res.status(404).json({ success: false, message: "No payment history found" });
        }

        res.status(200).json({ success: true, data: payments.rows });
    } catch (error) {
        console.error("Error fetching payment history:", error);
        res.status(500).json({ success: false, message: "Server error while fetching payment history" });
    }
};
