import sqlite3
import os

# مسیر مطلق برای فایل پایگاه داده
db_path = '/var/www/wolfcoin/database/users.db'

# ایجاد مسیر در صورت عدم وجود
os.makedirs(os.path.dirname(db_path), exist_ok=True)

# اتصال به پایگاه داده
conn = sqlite3.connect(db_path)
cursor = conn.cursor()

# ساخت جدول کاربران
cursor.execute('''
CREATE TABLE IF NOT EXISTS users (
    user_id TEXT PRIMARY KEY,
    username TEXT,
    balance REAL DEFAULT 0,
    mining_rate REAL DEFAULT 0.5,
    invite_code TEXT,
    invite_count INTEGER DEFAULT 0
)
''')

conn.commit()
conn.close()
print(f"Database and table created successfully at {db_path}")
