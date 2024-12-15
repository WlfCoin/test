const sqlite3 = require("sqlite3").verbose();

// محل ذخیره پایگاه داده
const dbPath = "/var/www/wolfcoin/bot/database.db";

// اتصال به پایگاه داده
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("Error connecting to database:", err);
        return;
    }
    console.log("Connected to the SQLite database.");
});

// ایجاد جداول پایگاه داده
db.serialize(() => {
    // جدول کاربران
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id TEXT UNIQUE NOT NULL,
            balance INTEGER DEFAULT 0,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

    // جدول دعوت‌ها
    db.run(`
        CREATE TABLE IF NOT EXISTS invites (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            inviter_id TEXT NOT NULL,
            invitee_id TEXT UNIQUE NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

    // جدول بوسترها
    db.run(`
        CREATE TABLE IF NOT EXISTS boosts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id TEXT NOT NULL,
            boost_type TEXT NOT NULL,
            value INTEGER NOT NULL,
            expires_at DATETIME
        )
    `);

    // جدول ماموریت‌ها
    db.run(`
        CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            task_name TEXT NOT NULL,
            reward INTEGER NOT NULL,
            completed_users TEXT DEFAULT ''
        )
    `);

    // جدول بونوس‌ها
    db.run(`
        CREATE TABLE IF NOT EXISTS bonuses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id TEXT NOT NULL,
            active_days INTEGER DEFAULT 0,
            last_claimed DATETIME
        )
    `);

    console.log("All tables have been created successfully.");
});

// بستن پایگاه داده
db.close((err) => {
    if (err) {
        console.error("Error closing the database:", err);
    }
    console.log("Database connection closed.");
});
