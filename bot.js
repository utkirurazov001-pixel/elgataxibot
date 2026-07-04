// ============================================================
//  KetdikGo — Telegram yo'naltiruvchi bot
//  "Belgila. Ko'r. Ketdik."
//
//  Bu YO'NALTIRUVCHI bot: foydalanuvchini KetdikGo ilovasiga, dispetcherga va
//  aloqa kanallariga yo'naltiradi. Bot ichida buyurtma berish YO'Q, api.elga.uz'ga
//  yozish YO'Q — faqat havolalar.
//
//  Barqarorlik: barcha handler try/catch bilan himoyalangan, bot.catch global
//  xatoni ushlaydi, polling xatolarida telegraf o'zi qayta ulanadi. Token bo'lmasa
//  aniq xabar bilan to'xtaydi (jim crash-loop emas).
// ============================================================
import "dotenv/config";
import { Telegraf, Markup } from "telegraf";
import { BRAND, LINKS, t } from "./config.js";

// Token: asosiy nom BOT_TOKEN. Mavjud Render sozlamasida (eski botdan) TELEGRAM_BOT_TOKEN
// bo'lishi mumkin — uni ham qabul qilamiz, shunda yangi env o'zgaruvchisi shart emas.
// DIQQAT: bu qiymat @ketdikgobot tokeni bo'lishi kerak (bot shu identitet bilan ishlaydi).
const TOKEN = process.env.BOT_TOKEN || process.env.TELEGRAM_BOT_TOKEN;
if (!TOKEN) {
  console.error(
    "❌ Token yo'q. BOT_TOKEN (yoki TELEGRAM_BOT_TOKEN) env o'zgaruvchisini qo'ying " +
    "(@BotFather'dan oling).\n   Namuna uchun: cp .env.example .env"
  );
  process.exit(1);
}

const bot = new Telegraf(TOKEN);

// Asosiy inline klaviatura — /start va fallback'da ko'rsatiladi.
// "Buyurtma berish" — URL tugma (ilova havolasi). Boshqalari — callback (matn qaytaradi).
function mainKeyboard(lang) {
  const T = t(lang);
  return Markup.inlineKeyboard([
    [Markup.button.url(T.btnOrder, LINKS.playStore)],
    [
      Markup.button.callback(T.btnDispatcher, "dispatcher"),
      Markup.button.callback(T.btnAbout, "about"),
    ],
  ]);
}

// Xavfsiz javob yuborish — bitta xabar ilovani qulatmasin (masalan foydalanuvchi
// botni bloklagan bo'lsa). Xato faqat log qilinadi.
async function safeReply(ctx, text, extra = {}) {
  try {
    await ctx.reply(text, { parse_mode: "HTML", disable_web_page_preview: false, ...extra });
  } catch (e) {
    console.error("reply xato:", e?.message || e);
  }
}

// --- Buyruqlar ---

bot.start(async (ctx) => {
  const T = t();
  await safeReply(ctx, T.start, mainKeyboard());
});

// /buyurtma — ilovaga yo'naltiradi
bot.command("buyurtma", async (ctx) => {
  const T = t();
  await safeReply(ctx, T.order(LINKS.playStore), mainKeyboard());
});

// /aloqa va /dispetcher — dispetcher raqami
const dispatcherHandler = async (ctx) => {
  const T = t();
  await safeReply(ctx, T.dispatcher(LINKS.dispatcherPhone));
};
bot.command("aloqa", dispatcherHandler);
bot.command("dispetcher", dispatcherHandler);

// /haqida — KetdikGo haqida
bot.command("haqida", async (ctx) => {
  const T = t();
  await safeReply(ctx, T.about, mainKeyboard());
});

// --- Inline tugma bosilishlari (callback) ---

bot.action("dispatcher", async (ctx) => {
  const T = t();
  try { await ctx.answerCbQuery(); } catch { /* eskirgan tugma — e'tiborsiz */ }
  await safeReply(ctx, T.dispatcher(LINKS.dispatcherPhone));
});

bot.action("about", async (ctx) => {
  const T = t();
  try { await ctx.answerCbQuery(); } catch { /* eskirgan tugma — e'tiborsiz */ }
  await safeReply(ctx, T.about, mainKeyboard());
});

// --- Boshqa har qanday xabar — do'stona standart javob ---
// (Eski botdagi OpenAI ulanishi YO'Q — keraksiz murakkablik/xarajat.)
bot.on("message", async (ctx) => {
  const T = t();
  await safeReply(ctx, T.fallback, mainKeyboard());
});

// --- Global xato ushlagich — bironta handler yiqilsa ham bot to'xtamaydi ---
bot.catch((err, ctx) => {
  console.error(`⚠️ Bot xatosi (update ${ctx?.updateType || "?"}):`, err?.message || err);
});

// --- Ishga tushirish ---
bot.launch()
  .then(() => console.log(`✅ ${BRAND.name} bot ishga tushdi — "${BRAND.slogan}"`))
  .catch((err) => {
    console.error("❌ Bot ishga tushmadi:", err?.message || err);
    process.exit(1);
  });

// Graceful shutdown — Render qayta deploy/to'xtatganda toza yopiladi
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
