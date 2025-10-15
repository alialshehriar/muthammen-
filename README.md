# 🌱 بذرة - Bithrah

**منصة الوساطة الذكية الأولى في المملكة العربية السعودية**

منصة بذرة هي منصة وساطة ذكية مدعومة بالذكاء الاصطناعي، تهدف لحل مشكلة صعوبة الوصول للتمويل التي يواجهها أصحاب الأفكار المبدعة في السعودية.

## ✨ المزايا الرئيسية

- 🤖 **تقييم ذكي بالـ AI** - تقييم شامل للأفكار والمشاريع
- 💼 **نظام الباقات المرن** - باقات متعددة لكل مشروع
- 🎁 **التسويق بالعمولة** - نظام إحالة متقدم
- 👥 **مجتمعات نشطة** - مجتمعات متخصصة لكل مجال
- 💰 **محفظة رقمية آمنة** - معاملات آمنة 100%
- 🔒 **حماية الملكية الفكرية** - نظام حماية متقدم

## 🛠 التقنيات المستخدمة

- **Next.js 15.5** - React Framework
- **TypeScript** - Type Safety
- **Tailwind CSS** - Styling
- **PostgreSQL (Neon)** - Database
- **NextAuth.js** - Authentication
- **OpenAI GPT-4** - AI Evaluation

## 📦 التثبيت

```bash
# استنساخ المشروع
git clone https://github.com/alialshehriar/bithrah-app.git
cd bithrah-app

# تثبيت المكتبات
pnpm install

# إعداد متغيرات البيئة
cp .env.example .env.local

# تشغيل المشروع
pnpm dev
```

## 🔐 متغيرات البيئة

```env
DATABASE_URL=your_neon_database_url
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret_key
OPENAI_API_KEY=your_openai_api_key
```

## 📁 هيكل المشروع

```
bithrah-app/
├── app/              # Next.js App Router
├── components/       # React Components
├── lib/             # Utilities & Database
├── public/          # Static Assets
└── ...
```

## 🚀 النشر

المشروع جاهز للنشر على Vercel:

```bash
vercel --prod
```

## 📞 التواصل

- **الموقع**: https://bithrahapp.com
- **البريد**: info@bithrahapp.com

---

© 2024 بذرة. جميع الحقوق محفوظة.

