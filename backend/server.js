const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();
require('./jobs/resetBoosts');

const app = express();

const boostRoutes = require("./api/routes/boostRoutes");
const homeRoutes = require("./api/routes/homeRoutes");
const tasksRoutes = require("./api/routes/tasksRoutes");
const inviteRoutes = require("./api/routes/inviteRoutes");
const walletRoutes = require("./api/routes/walletRoutes");
const bonusRoutes = require("./api/routes/bonusRoutes");
const userRoutes = require("./api/routes/userRoutes");
const paymentRoutes = require("./api/routes/payment");

app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Database connected"))
    .catch((err) => console.error("Database connection error:", err));

// Serve static files
app.use(express.static(path.join(__dirname, "../frontend/public")));

// Routes
app.use("/api/boost", boostRoutes);
app.use("/api/home", homeRoutes);
app.use("/api/tasks", tasksRoutes);
app.use("/api/invite", inviteRoutes);
app.use("/api/wallet", walletRoutes);
app.use("/api/bonus", bonusRoutes);
app.use("/api/user", userRoutes);
app.use("/api/payment", paymentRoutes);

// Example API route
app.get("/api/home", (req, res) => {
    res.json({ message: "Welcome to Wolfcoin API!" });
});

// Fallback for SPA (Single Page Application)
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/public/index.html"));
});

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Internal server error" });
});

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running at ${process.env.DOMAIN}:${PORT} or IP: ${process.env.IP_ADDRESS}:${PORT}`);
});
