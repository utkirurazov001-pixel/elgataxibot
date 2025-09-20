import openai
import os
from dotenv import load_dotenv
from telegram import Update
from telegram.ext import (
    ApplicationBuilder, CommandHandler, MessageHandler, ContextTypes, filters
)

# Load environment variables
load_dotenv()

# API keys
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
TELEGRAM_BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")
openai.api_key = OPENAI_API_KEY

# /start
async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text(
        "Ассалому алайкум! \n\n"
        "✅ Расмий ELGA TAXI мобил иловасини юклаб олинг ва буюртмани илова орқали тезрок беринг!\n"
        "📲 https://play.google.com/store/apps/details?id=uz.teamwork.elgataxi\n\n"
        "✅ Тезкор етказиш\n"
        "✅ Хавфсиз ҳайдовчилар\n"
        "✅ 24/7 хизмат"
    )

# /help
async def help_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text(
        "ℹ️ Ёрдам учун қуйидаги буйруқлардан фойдаланинг:\n\n"
        "/start - Ботни бошлаш\n"
        "/app - Иловани юклаш\n"
        "/info - Биз ҳақимизда\n"
        "/call - Диспетчер билан боғланиш\n"
        "/partner - Ҳамкорлик таклифлари"
    )

# /app
async def app_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text(
        "📲 ELGA TAXI мобил иловасини юклаб олинг:\n"
        "https://play.google.com/store/apps/details?id=uz.teamwork.elgataxi"
    )

# /info
async def info_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text(
        "ℹ️ Биз ҳақимизда:\n"
        "ELGA TAXI — бу онлайн такси буюртма бериш платформаси бўлиб, "
        "юқори тезликдаги хизмат, хавфсиз ҳайдовчилар ва қулай мобил илова таклиф этади."
    )

# /call
async def call_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text(
        "📞 Диспетчер билан боғланиш:\n"
        "Қисқа рақам: 1226\n"
        "Телефон: +998 77 064 12 26"
    )

# /partner
async def partner_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text(
        "🤝 Ҳамкорлик таклифи:\n\n"
        "Сизнинг ҳудудингизда ELGA TAXI платформасини ишга туширмоқчимисиз?\n"
        "Ёки тайёр IT ечимни харид қилиб, ўз брендингингиз билан бошламоқчимисиз?\n\n"
        "📩 Биз билан боғланинг:\n"
        "Telegram: @elgataxisupport\n"
        "Телефон: +998 77 064 12 26\n"
        "Email: elgataxi@support.uz"
    )

# AI жавоб
async def handle_message(update: Update, context: ContextTypes.DEFAULT_TYPE):
    user_message = update.message.text

    try:
        response = await openai.ChatCompletion.acreate(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "Сиз фойдаланувчиларга ёрдам берувчи AI ёрдамчисиз."},
                {"role": "user", "content": user_message}
            ]
        )
        answer = response.choices[0].message.content
    except Exception as e:
        answer = "Кечирасиз, ҳозирча AI жавоб бера олмади."

    await update.message.reply_text(answer)

# Bot runner
if __name__ == "__main__":
    app = ApplicationBuilder().token(TELEGRAM_BOT_TOKEN).build()

    # Command handlers
    app.add_handler(CommandHandler("start", start))
    app.add_handler(CommandHandler("help", help_command))
    app.add_handler(CommandHandler("app", app_command))
    app.add_handler(CommandHandler("info", info_command))
    app.add_handler(CommandHandler("call", call_command))
    app.add_handler(CommandHandler("partner", partner_command))

    # Text handler
    app.add_handler(MessageHandler(filters.TEXT & (~filters.COMMAND), handle_message))

    # Run bot
    app.run_polling()
