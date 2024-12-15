import telebot
from telebot.types import InlineKeyboardMarkup, InlineKeyboardButton
import sqlite3
from datetime import datetime
from dotenv import load_dotenv
import os
import schedule
import time

# بارگذاری متغیرهای محیطی
load_dotenv()

BOT_TOKEN = os.getenv("BOT_TOKEN")
ADMIN_ID = int(os.getenv("ADMIN_ID"))
DATABASE = os.getenv("DATABASE_URL", "/var/www/wolfcoin/bot/database.db")
CHANNEL_ID = "@WolfCoin_news"
TOTAL_SUPPLY = 120_000_000_000

bot = telebot.TeleBot(BOT_TOKEN)


# اتصال به پایگاه داده
def get_db():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn


# بررسی عضویت کاربر در کانال
def is_user_in_channel(user_id):
    try:
        member = bot.get_chat_member(chat_id=CHANNEL_ID, user_id=user_id)
        return member.status in ["member", "administrator", "creator"]
    except Exception:
        return False


# پیام خوشامدگویی
@bot.message_handler(commands=['start'])
def welcome_message(message):
    user_id = message.from_user.id

    # بررسی عضویت در کانال
    if not is_user_in_channel(user_id):
        bot.send_message(
            message.chat.id,
            "⚠️ To enter the Wolf Coin Hunt, membership in the community channel is required: https://t.me/WolfCoin_news. Please join first and restart the bot."
        )
        return

    db = get_db()
    cursor = db.cursor()

    # ثبت کاربر در پایگاه داده
    cursor.execute("INSERT OR IGNORE INTO users (user_id, balance) VALUES (?, ?)", (user_id, 0))
    db.commit()

    # پیام خوشامدگویی
    try:
        with open('/var/www/wolfcoin/bot/wellcombaner.jpg', 'rb') as photo:
            bot.send_photo(
                message.chat.id,
                photo,
                caption=(
                    "Hello, welcome to wolf hunting.\n"
                    "Stay in the pack of wolves, let everyone know that the top hunter has come, "
                    "we will show no mercy, soon those who did not join us will definitely regret it.\n"
                    "Remember this name because you will hear it a lot in the future: Wolfcoin.\n"
                    "The hunt has started. If you want to be a part of the team and not starve, start now."
                ),
                reply_markup=welcome_buttons()
            )
    except Exception as e:
        bot.send_message(message.chat.id, "An error occurred while sending the welcome message.")
        print(f"Error in welcome_message: {e}")


# دکمه‌های پیام خوشامدگویی
def welcome_buttons():
    markup = InlineKeyboardMarkup()
    markup.add(
        InlineKeyboardButton("Community", url="https://t.me/wolfCoin_news"),
        InlineKeyboardButton("Activity", url="https://t.me/Activityofprojectusers")
    )
    markup.add(
        InlineKeyboardButton("Twitter", url="https://x.com/wlfcoinofficial?t=x6TDbhipSMYkU4bWw_dI_g&s=09"),
        InlineKeyboardButton("YouTube", url="http://www.youtube.com/@WolfCoinOfficial")
    )
    markup.add(
        InlineKeyboardButton("Instagram", url="https://www.instagram.com/wolfcoin.official/profilecard/?igsh=MWRpa2p1ZmU4OGVzMg==7"),
        InlineKeyboardButton("Play", url="https://wolfcoin.net")
    )
    return markup


# ایجاد لینک دعوت و ثبت دعوت‌ها
@bot.message_handler(commands=["invite"])
def generate_invite_link(message):
    user_id = message.from_user.id
    invite_link = f"https://t.me/WolfCoinBot?start={user_id}"
    bot.reply_to(message, f"Your invite link: {invite_link}")


@bot.message_handler(commands=["start"])
def handle_invite(message):
    user_id = message.from_user.id
    args = message.text.split()
    inviter_id = int(args[1]) if len(args) > 1 else None

    db = get_db()
    cursor = db.cursor()

    if inviter_id and inviter_id != user_id:
        cursor.execute(
            "INSERT OR IGNORE INTO invites (inviter_id, invitee_id) VALUES (?, ?)",
            (inviter_id, user_id),
        )
        cursor.execute("UPDATE users SET balance = balance + 2 WHERE user_id = ?", (inviter_id,))
        db.commit()

    cursor.execute(
        "INSERT OR IGNORE INTO users (user_id, balance) VALUES (?, ?)", (user_id, 0)
    )
    db.commit()

    bot.send_message(
        user_id,
        "🎉 Welcome to Wolf Coin! Start earning tokens by completing tasks, inviting friends, or upgrading plans.",
    )


# ارسال گزارش روزانه
def daily_report():
    try:
        db = get_db()
        cursor = db.cursor()
        cursor.execute("SELECT SUM(balance) FROM users")
        total_extracted = cursor.fetchone()[0] or 0
        remaining_supply = TOTAL_SUPPLY - total_extracted

        report = (
            f"📊 Daily Report:\n\n"
            f"Total Extracted: {total_extracted:,}\n"
            f"Remaining Supply: {remaining_supply:,}\n"
            f"Keep mining and stay in the hunt! 🐺"
        )
        bot.send_message(CHANNEL_ID, report)
    except Exception as e:
        print(f"Error in daily_report: {e}")


# تنظیم ارسال گزارش روزانه در ساعت مشخص
schedule.every().day.at("12:00").do(daily_report)


def schedule_runner():
    while True:
        schedule.run_pending()
        time.sleep(1)


# اجرای اصلی ربات
if __name__ == "__main__":
    try:
        import threading

        threading.Thread(target=schedule_runner).start()
        bot.polling()
    except Exception as e:
        print(f"Error in main execution: {e}")
