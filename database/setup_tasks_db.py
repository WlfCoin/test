import sqlite3
import os

# مسیر مطلق پایگاه داده
db_path = '/var/www/wolfcoin/database/tasks.db'

# ایجاد مسیر در صورت عدم وجود
os.makedirs(os.path.dirname(db_path), exist_ok=True)

# اتصال به پایگاه داده
conn = sqlite3.connect(db_path)
cursor = conn.cursor()

# ساخت جدول tasks
cursor.execute('''
CREATE TABLE IF NOT EXISTS tasks (
    task_id INTEGER PRIMARY KEY AUTOINCREMENT,
    task_name TEXT,
    reward REAL,
    url TEXT
)
''')

# ساخت جدول user_tasks
cursor.execute('''
CREATE TABLE IF NOT EXISTS user_tasks (
    user_task_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT,
    task_id INTEGER,
    status TEXT DEFAULT 'pending',
    completion_date DATETIME,
    FOREIGN KEY (user_id) REFERENCES users (user_id),
    FOREIGN KEY (task_id) REFERENCES tasks (task_id)
)
''')

conn.commit()
conn.close()
print(f"Database and tables created successfully at {db_path}")
