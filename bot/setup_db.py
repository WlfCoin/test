import sqlite3

db_path = '/var/www/wolfcoin/bot/database.db'

conn = sqlite3.connect(db_path)
cursor = conn.cursor()
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
print("Database created successfully!")
