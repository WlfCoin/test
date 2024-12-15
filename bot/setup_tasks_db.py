import sqlite3
import os

DB_PATH = "/var/www/wolfcoin/bot/tasks_database.db"

os.makedirs(os.path.dirname(DB_PATH), exist_ok=True)


conn = sqlite3.connect(DB_PATH)
cursor = conn.cursor()


cursor.execute('''
CREATE TABLE IF NOT EXISTS tasks (
    task_id INTEGER PRIMARY KEY AUTOINCREMENT,
    task_name TEXT NOT NULL,
    reward REAL DEFAULT 0,
    url TEXT
)
''')

cursor.execute('''
CREATE TABLE IF NOT EXISTS user_tasks (
    user_task_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT NOT NULL,
    task_id INTEGER NOT NULL,
    status TEXT DEFAULT 'pending',
    completion_date DATETIME,
    FOREIGN KEY (task_id) REFERENCES tasks (task_id)
)
''')

conn.commit()
conn.close()
print(f"Database created successfully at {DB_PATH}")
