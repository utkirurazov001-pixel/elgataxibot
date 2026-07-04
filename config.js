// ============================================================
//  KetdikGo bot — brend matnlari va sozlamalar (YAGONA MANBA)
//  Har qanday matn/havola/raqam SHU yerda. Kod ichida hardcode QILINMAYDI —
//  bir joydan o'zgartiriladi. Kelajakda rus tili qo'shilishi uchun matnlar
//  til bo'yicha (TEXTS.uz / TEXTS.ru) tuzilgan.
// ============================================================

// Brend — o'zgarmas qiymatlar
export const BRAND = {
  name: "KetdikGo",
  slogan: "Belgila. Ko'r. Ketdik.",
  domain: "ketdikgo.uz",
  region: "Angor va Muzrabot",
};

// Havolalar va raqamlar — env orqali to'ldiriladi (bo'lmasa xavfsiz standart).
// DIQQAT: Play Store havolasi hali placeholder — Telegram inline URL tugmasi
// YAROQLI http(s) havola talab qiladi, shuning uchun standart = brend domeni
// (https://ketdikgo.uz). Play Store'da chiqqach PLAY_STORE_URL ni to'ldiring.
export const LINKS = {
  playStore: process.env.PLAY_STORE_URL || "https://ketdikgo.uz",
  appStore: process.env.APP_STORE_URL || "https://ketdikgo.uz",
  dispatcherPhone: process.env.DISPATCHER_PHONE || "1226",
  // Sayt (jonli landing) va Maxfiylik siyosati — ketdikgo.uz'da nashr qilingan.
  site: process.env.SITE_URL || "https://ketdikgo.uz",
  privacy: process.env.PRIVACY_URL || "https://ketdikgo.uz/privacy",
};

// Foydalanuvchi bilan muloqot tili (kelajakda "ru" qo'shiladi)
export const DEFAULT_LANG = "uz";

// Matnlar — HTML parse_mode uchun (<b>, <i>). Til bo'yicha guruhlangan.
export const TEXTS = {
  uz: {
    start:
      `🚕 <b>${BRAND.name}</b> — <i>${BRAND.slogan}</i>\n\n` +
      `Qo'ng'iroqsiz taksi, oldindan aniq narx.\n` +
      `${BRAND.region} tumanlarida xizmat.\n\n` +
      `Quyidagi tugmalardan foydalaning 👇`,

    order: (playStore) =>
      `🚕 <b>Buyurtma berish</b>\n\n` +
      `${BRAND.name} ilovasini yuklang:\n${playStore}\n\n` +
      `1️⃣ Ilovani o'rnating\n` +
      `2️⃣ Joyni belgilang\n` +
      `3️⃣ Narxni ko'ring\n` +
      `4️⃣ Ketdik! 🚀`,

    dispatcher: (phone) =>
      `📞 <b>Dispetcher</b>\n\n` +
      `Raqam: <b>${phone}</b>\n\n` +
      `Qo'ng'iroq qiling yoki ${BRAND.name} ilovasi orqali buyurtma bering.`,

    about:
      `ℹ️ <b>${BRAND.name}</b> — <i>${BRAND.slogan}</i>\n\n` +
      `• Qo'ng'iroqsiz taksi\n` +
      `• Oldindan aniq narx — safar oldidan bilasiz\n` +
      `• ${BRAND.region} tumanlari\n` +
      `• Ishonchli haydovchilar\n\n` +
      `🌐 ${BRAND.domain}\n` +
      `📄 Maxfiylik: ${BRAND.domain}/privacy`,

    fallback:
      `Buyurtma uchun /buyurtma buyrug'ini yuboring yoki quyidagi tugmalardan foydalaning 👇`,

    // Inline tugma matnlari
    btnOrder: "🚕 Buyurtma berish",
    btnDispatcher: "📞 Dispetcher",
    btnAbout: "ℹ️ Biz haqimizda",
  },
};

// Joriy til matnlarini qulay olish uchun yordamchi
export function t(lang = DEFAULT_LANG) {
  return TEXTS[lang] || TEXTS[DEFAULT_LANG];
}
