
import openai
import os
from dotenv import load_dotenv
from telegram import Update
from telegram.ext import ApplicationBuilder, CommandHandler, MessageHandler, ContextTypes, filters

# Load environment variables
load_dotenv()

# API keys
openai.api_key = os.getenv("OPENAI_API_KEY")
TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")

# Start command
async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text(
        "Ассалому алайкум! \n\n"
        "✅ Расмий ELGA TAXI мобил иловасини юклаб олинг ва буюртмани илова орқали тезрок беринг!\n"
        "📲 https://play.google.com/store/apps/details?id=uz.teamwork.elgataxi\n\n"
        "✅ Тезкор етказиш\n"
        "✅ Хавфсиз ҳайдовчилар\n"
        "✅ 24/7 хизмат"
    )

# AI response
async def handle_message(update: Update, context: ContextTypes.DEFAULT_TYPE):
    user_message = update.message.text
    try:
        chat_completion = await openai.ChatCompletion.acreate(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "Сиз фойдаланувчиларга ёрдам берувчи AI ёрдамчисисиз."},
                {"role": "user", "content": user_message}
            ]
        )
        answer = chat_completion.choices[0].message.content
    except Exception as e:
        answer = "Кечирасиз, ҳозирча AI жавоб бера олмади."
    await update.message.reply_text(answer)

# Bot runner
if __name__ == "__main__":
    app = ApplicationBuilder().token(TOKEN).build()
    app.add_handler(CommandHandler("start", start))
    app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, handle_message))
    app.run_polling()
