from pysqlcipher3 import dbapi2 as sqlite

conn = sqlite.connect('./database/users_encrypted.db')
cursor = conn.cursor()

# تنظیم رمز عبور
cursor.execute("PRAGMA key = 'your_secure_password'")

# انتقال داده‌ها از پایگاه داده قدیمی
cursor.execute('ATTACH DATABASE "./database/users.db" AS plaintext')
cursor.execute('CREATE TABLE users_encrypted AS SELECT * FROM plaintext.users')
conn.commit()
conn.close()
