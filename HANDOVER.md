# تقرير تسليم مشروع Eloria — للمحادثة الجديدة

---

## 1. الهدف العام

بناء متجر سلة كامل لمنتج واحد هو **Eloria Brightening Body Booster Serum** (بوستر سيروم تفتيح الجسم).

المتجر الحقيقي: `https://salla.sa/eloriapure`

المطلوب النهائي:
- الصفحة الرئيسية بتصميم Eloria الكامل (landing page + متجر فعلي)
- زر "اطلبي الآن" يوصل لصفحة المنتج الحقيقي
- الثيم مثبت على متجر eloriapure الحقيقي
- كل الأقسام تعمل: هيرو، فوائد، روتين، تقييمات، CTA، فوتر

---

## 2. الوضع الحالي

### ✅ مكتمل:
- ثيم Eloria مبني كامل بملفات Twig + SCSS
- الصفحة الرئيسية (index.twig) مصممة بالكامل
- الهيدر معدّل: hamburger menu بدل التصنيفات الأفقية
- الفوتر معدّل: تصميم Eloria بخلفية داكنة
- الكود مرفوع على GitHub: `https://github.com/rno1121/eloria`
- صورة المنتج الحقيقية محفوظة على CDN سلة
- الـ CSS (eloria.scss) مكتوب كامل بـ 1400+ سطر

### ⏳ معلّق (ينتظر تحقق الهوية):
- نشر الثيم على سلة عبر `salla theme publish` — يطلع error: "Please verify your ID"
- تثبيت الثيم على متجر eloriapure الحقيقي
- رؤية التغييرات (هيدر + فوتر) في المعاينة الحقيقية

### ❌ لم يُنجز بعد:
- ربط زر "اطلبي الآن" بمنتج حقيقي على متجر eloriapure
- حذف التصنيفات الزايدة (جاكيتات، تناتير، بلايز...) من المتجر
- استبدال ملفات الثيم بالتصميم الجديد من "eloria (Remix).zip" (ملف رفعته المستخدمة في نهاية المحادثة)

---

## 3. الملفات — المسارات والوظائف

```
C:\Users\ranla\eloria\                          ← مجلد الثيم الرئيسي
│
├── src/
│   ├── views/
│   │   ├── pages/
│   │   │   └── index.twig                      ← الصفحة الرئيسية (معدّل — الأهم)
│   │   ├── components/
│   │   │   ├── header/
│   │   │   │   └── header.twig                 ← الهيدر (معدّل — hamburger menu)
│   │   │   └── footer/
│   │   │       └── footer.twig                 ← الفوتر (معدّل — تصميم Eloria)
│   │   └── layouts/
│   │       └── master.twig                     ← اللأوت الرئيسي (لم يُعدّل)
│   │
│   ├── assets/
│   │   └── styles/
│   │       ├── app.scss                        ← ملف CSS الرئيسي (يستورد الملفات الأخرى)
│   │       └── 05-utilities/
│   │           └── eloria.scss                 ← كل CSS خاص بـ Eloria (أنشأناه — 1408 أسطر)
│   │
│   └── locales/
│       ├── ar.json                             ← الترجمة العربية (معدّل)
│       └── en.json                             ← الترجمة الإنجليزية (معدّل)
│
├── public/                                     ← الملفات المبنية (لا تعدّل يدوياً)
│   ├── app.css                                 ← CSS المجمع بعد البيلد
│   └── app.js
│
├── twilight.json                               ← معرّف الثيم لدى سلة (Theme ID: 1216973000)
└── package.json                                ← يستخدم pnpm وليس npm
```

### ملف مرفوع جديد (لم يُطبَّق بعد):
`eloria (Remix).zip` — تصميم جديد صممته المستخدمة من Claude Design، تريد استبداله بالثيم الحالي كاملاً بدون تغيير.

---

## 4. الأكواد المهمة

### أ) صورة المنتج (في index.twig):
```twig
<img src="https://cdn.salla.sa/OqVEKa/vDAnghAW8BP9uwl4pu6j7ZsQK4toy2jM6bT0MJBa.jpg"
     alt="Eloria Brightening Body Serum"
     class="hero-product-img" loading="eager" width="480" height="600">
```

### ب) رابط زر "اطلبي الآن" الحالي (في index.twig):
```twig
<a href="/lvNPPDd" class="btn btn-primary btn-lg">
    {{ trans('pages.products.order_now') }}
</a>
```
⚠️ هذا الرابط `/lvNPPDd` من المتجر التجريبي المنتهي — لازم يُحدَّث برابط المنتج الحقيقي من متجر eloriapure.

### ج) Meta Description (في index.twig — السطر 4):
```twig
{% block description %}بوستر سيروم تفتيح الجسم — أضيفيه لكريمك المفضل للحصول على نتائج واضحة خلال 14 يوم. بتركيبة Tranexamic Acid 3% وNiacinamide 4% وAlpha Arbutin 2%.{% endblock %}
```

### د) متغيرات CSS الرئيسية (في eloria.scss):
```scss
:root {
  --black:       #0D0D0D;
  --white:       #FAF8F5;
  --rose:        #C8956C;
  --rose-light:  #E8C4A8;
  --rose-pale:   #F5EDE4;
  --gray:        #6B6560;
  --font-serif:  'Cormorant Garamond', Georgia, serif;
  --font-sans:   'Tajawal', system-ui, sans-serif;
}
```

### هـ) الهيدر (header.twig) — الجزء المعدّل:
```twig
<div id="mainnav" class="eloria-mainnav shadow-default flex items-center">
    <div class="inner bg-inherit w-full">
        <div class="container">
            <div class="flex items-stretch justify-between relative">
                <div class="flex items-center gap-4">
                    <a class="eloria-hamburger mburger mburger--collapse leading-none" href="#mobile-menu" aria-label="Open-menu">
                        <span class="eloria-hamburger-lines">
                            <span></span><span></span><span></span>
                        </span>
                    </a>
                    <a class="navbar-brand" href="{{ store.url }}">
                        <img ... src="{{ store.logo|cdn(175) }}" ...>
                    </a>
                </div>
                <custom-main-menu style="display:none"></custom-main-menu>
                <div class="flex items-center justify-end my-2.5">
                    <salla-user-menu ...></salla-user-menu>
                    <salla-cart-summary ...></salla-cart-summary>
                </div>
            </div>
        </div>
    </div>
</div>
```

---

## 5. القرارات والأسباب

| القرار | السبب |
|--------|-------|
| استخدام Twig + سلة CLI بدل حل مخصص | المتجر على منصة سلة، الثيم لازم يكون Twilight theme |
| تثبيت `eloria.scss` منفصل عن `app.scss` | عشان ما نعدّل ملفات الثيم الأصلية وتضيع عند التحديث |
| تصوير المنتج hardcoded بـ CDN URL | متغير `product` غير متاح في صفحة index.twig بسلة |
| رابط `/lvNPPDd` hardcoded | نفس السبب — لا يوجد product variable في الهوم بيج |
| استخدام `pnpm` وليس `npm` | المشروع يرفض npm ويشترط pnpm |
| draft URL بدون `?assets_url=` | يحمل CSS من CDN سلة بدل localhost (يحل مشكلة mixed content) |
| hamburger menu على كل الشاشات | طلب المستخدمة — تريد 3 خطوط بدل تصنيفات ظاهرة |

---

## 6. المشاكل والأخطاء

### ✅ محلولة:

| المشكلة | الحل |
|---------|------|
| CSS لا يظهر في المعاينة | استخدام draft URL بدون `?assets_url` parameter |
| `git tag 1.0.15` conflict | إنشاء tag يدوياً: `git tag 1.0.15 && git push origin 1.0.15` |
| Twig changes لا تنعكس | قول YES لسؤال "Shall the CLI commit those changes?" |
| زر "اطلبي الآن" لا يعمل | product variable مش متاح في index، الحل hardcode الرابط |
| 410 error على صفحة المنتج | المتجر التجريبي `dev-vhnvn2dzjvrbmlce` انتهت صلاحيته |
| Mixed content blocking | Chrome إعداد "insecure content" لـ s.salla.sa (مضاف مسبقاً) |

### ❌ لم تُحل بعد:

| المشكلة | السبب | الحل المطلوب |
|---------|-------|-------------|
| `salla theme publish` يفشل | "Please verify your ID" — تحقق الهوية على البورتال معلّق | انتظار موافقة سلة على طلب التحقق |
| رابط التثبيت المباشر يعطي 404 | الثيم غير منشور بعد | بعد تحقق الهوية، `salla theme publish` ثم الرابط |
| الثيم غير مثبت على eloriapure | نفس السبب | نفس الحل |

---

## 7. الخطوات الجاية (بالترتيب)

### أولاً — الملفات الجديدة (أهم خطوة):
1. فك ضغط `eloria (Remix).zip`
2. استبدال ملفات الثيم الحالية بالملفات الجديدة كاملاً
3. تشغيل `pnpm run production` للبيلد
4. تشغيل `salla theme publish` لرفع التغييرات

### ثانياً — بعد تحقق الهوية على البورتال:
5. التحقق أن `salla theme publish` ينجح بدون خطأ
6. تجربة رابط التثبيت: `https://s.salla.sa/marketplace/themes/direct/1216973000`
7. تثبيت الثيم على متجر eloriapure

### ثالثاً — إصلاح المحتوى:
8. إضافة منتج "سيروم إيلوريا" على متجر eloriapure (إذا لم يكن موجوداً)
9. الحصول على رابط المنتج الحقيقي من eloriapure
10. تحديث `/lvNPPDd` في index.twig برابط المنتج الحقيقي
11. حذف التصنيفات الزايدة (جاكيتات، تناتير، بلايز...) من لوحة التحكم

### رابعاً — اختبار نهائي:
12. التأكد من ظهور التصميم الكامل على eloriapure
13. اختبار زر "اطلبي الآن" يوصل لصفحة المنتج
14. اختبار عملية الشراء كاملة

---

## 8. معلومات تقنية مهمة

### بيانات المشروع:
- **Theme ID**: 1216973000
- **GitHub Repo**: `https://github.com/rno1121/eloria`
- **Partners Portal**: `portal.salla.partners/themes/1216973000`
- **Draft Preview URL**: `https://s.salla.sa/design/draft-1698355913`
- **متجر حقيقي**: `https://salla.sa/eloriapure`
- **صورة المنتج CDN**: `https://cdn.salla.sa/OqVEKa/vDAnghAW8BP9uwl4pu6j7ZsQK4toy2jM6bT0MJBa.jpg`
- **Package manager**: `pnpm` (ليس npm)

### أوامر البيلد:
```bash
cd C:\Users\ranla\eloria
pnpm run production        # بناء CSS/JS
salla theme publish        # رفع للسيرفر (يحتاج تحقق هوية)
salla theme serve          # معاينة محلية
```

### بنية الـ CSS:
- `app.scss` يستورد كل الملفات بما فيها `eloria.scss`
- `eloria.scss` في `src/assets/styles/05-utilities/`
- كل CSS خاص بـ Eloria في `eloria.scss` فقط

### تفضيلات المستخدمة:
- لا تريد نشر الثيم للعموم في سوق سلة
- تريد فقط تثبيته على متجرها الخاص eloriapure
- تفضل hamburger menu بدل تصنيفات أفقية في الهيدر
- الألوان الأساسية: rose `#C8956C`، black `#0D0D0D`، white `#FAF8F5`
- المنتج الوحيد: بوستر سيروم تفتيح الجسم، 149 ريال، 50ml

---

## ملاحظة ختامية للمحادثة الجديدة

المستخدمة رفعت ملف `eloria (Remix).zip` في نهاية المحادثة وقالت إنه تصميم جديد صممته من Claude Design وتريد نقله للثيم كاملاً بدون تعديل. هذا الملف لم يُفتح ولم يُطبَّق بعد — أول خطوة في المحادثة الجديدة هي فك الضغط وتطبيقه.
