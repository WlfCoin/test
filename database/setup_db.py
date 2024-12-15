import sqlite3

conn = sqlite3.connect('./database/users.db')
cursor = conn.cursor()

# ایجاد جدول کاربران
cursor.execute('''
CREATE TABLE IF NOT EXISTS users (
    user_id TEXT PRIMARY KEY,
    username TEXT,
    balance REAL,
    mining_rate REAL,
    invite_code TEXT,
    invite_count INTEGER
)
''')

conn.commit()
conn.close()
