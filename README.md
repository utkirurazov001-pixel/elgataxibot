# KetdikGo — Telegram yo'naltiruvchi bot

> **Belgila. Ko'r. Ketdik.**

KetdikGo brendida oddiy, **barqaror** Telegram bot. Foydalanuvchini KetdikGo ilovasiga,
dispetcherga va aloqa kanallariga **yo'naltiradi**. Bot ichida buyurtma berish **yo'q**
(bu keyingi bosqich), `api.elga.uz`'ga hech narsa yozmaydi — faqat havolalar.

> Eski `elga_bot.py` (Python, Teamwork ilovasiga yo'naltiruvchi, crash-loop) bilan
> **hech qanday aloqasi yo'q**. Bu noldan yozilgan, mustaqil Node.js bot. Eski Python
> bot va fayllari `eski_python/` papkasida **saqlangan** (o'chirilmagan, ishlatilmaydi).

---

## Texnologiya (nega — crash oldini olish)

| Element | Tanlov | Sabab |
|---|---|---|
| Til | Node.js (ESM) | Backend bilan bir xil — kelajakda integratsiya oson |
| Kutubxona | `telegraf@4.16.3` (aniq pin) | Barqaror, zamonaviy; versiya qat'iy belgilangan |
| Node | `>=18.17` (`engines`), Render'da `NODE_VERSION=20` | Versiya nomuvofiqligidan crash bo'lmasin (eski bot aynan shundan yiqilgan: `python-telegram-bot` + Python 3.13) |

Barqarorlik: har handler `try/catch`, global `bot.catch`, polling xatosida telegraf
o'zi qayta ulanadi, `SIGINT/SIGTERM`'da toza yopiladi. `BOT_TOKEN` bo'lmasa — aniq
xabar bilan to'xtaydi (jim crash-loop emas).

---

## Buyruqlar

| Buyruq | Vazifa |
|---|---|
| `/start` | Xush kelibsiz + asosiy tugmalar (Buyurtma / Dispetcher / Biz haqimizda) |
| `/buyurtma` | Ilovaga yo'naltiradi (Play Store + qisqa yo'riqnoma) |
| `/aloqa`, `/dispetcher` | Dispetcher raqamini beradi |
| `/haqida` | KetdikGo haqida qisqa ma'lumot |
| boshqa har qanday xabar | Do'stona standart javob + tugmalar |

---

## Lokal ishga tushirish

```bash
cp .env.example .env          # va BOT_TOKEN ni to'ldiring
npm install
npm start
```

`BOT_TOKEN` ni [@BotFather](https://t.me/BotFather) dan oling (`/newbot`).
Ishga tushganda log: `✅ KetdikGo bot ishga tushdi — "Belgila. Ko'r. Ketdik."`

---

## Render'ga deploy (Background Worker)

1. Render → **New → Background Worker** (yoki Blueprint bilan root'dagi `render.yaml`).
2. **Root Directory:** `.` (repo ildizi)
3. **Build Command:** `npm ci`
4. **Start Command:** `npm start`  ← faqat Node.js botni ishga tushiradi (Python EMAS)
5. **Environment** → `BOT_TOKEN` (majburiy) va ixtiyoriy `PLAY_STORE_URL`, `DISPATCHER_PHONE`.

> Eski Python bot `eski_python/` da (o'chirilmagan). Uni deploy QILMANG. Agar eski
> Render `elga-bot` (Python) xizmati hali ishlayotgan bo'lsa — to'xtating (ikkita bot
> bir tokenda `Conflict: terminated by other getUpdates` beradi).

---

## To'ldirilishi kerak bo'lgan PLACEHOLDER'lar

`config.js` / env orqali (kod ichida hardcode emas):

| Qiymat | Hozirgi (standart) | To'ldirilsin |
|---|---|---|
| `BOT_TOKEN` | — (majburiy; `TELEGRAM_BOT_TOKEN` ham qabul qilinadi) | @ketdikgobot tokeni (@BotFather) |
| `PLAY_STORE_URL` | `https://ketdikgo.uz` | Play Store'da chiqqach to'liq havola (masalan `https://play.google.com/store/apps/details?id=uz.ketdik.mijoz`) |
| `APP_STORE_URL` | `https://ketdikgo.uz` | iOS App Store havolasi (ixtiyoriy) |
| `DISPATCHER_PHONE` | `1226` | Haqiqiy dispetcher raqami |

> **Eslatma:** `PLAY_STORE_URL` standarti brend domeni (`https://ketdikgo.uz`) — chunki
> Telegram inline URL tugmasi **yaroqli** http(s) havola talab qiladi (aks holda tugma xato beradi).

---

## Kelajak (bu bosqichda YO'Q)

Bot ichida buyurtma qabul qilish, `api.elga.uz` integratsiyasi, rus tili. Matnlar
`config.js`'da til bo'yicha (`TEXTS.uz`) tuzilgan — `ru` qo'shish oson.
