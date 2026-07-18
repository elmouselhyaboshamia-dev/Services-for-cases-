# واجهة برمجية لحل مشاكل الويندوز

واجهة برمجية شاملة لتشخيص وحل مشاكل نظام الويندوز، مع القدرة على مراقبة الأداء وإدارة الخدمات.

## الميزات الرئيسية

✅ **تشخيص النظام**
- فحص استخدام CPU والذاكرة ومساحة القرص
- فحص اتصال الشبكة
- تقديم توصيات تحسين الأداء

✅ **حل المشاكل الشائعة**
- حل مشاكل الشبكة (إعادة تعيين محول الشبكة، مسح DNS)
- تحسين الأداء (تنظيف الملفات المؤقتة، إدارة البرامج المبدئية)
- إصلاح البرامج

✅ **إدارة الخدمات**
- عرض قائمة الخدمات
- بدء/إيقاف/إعادة تشغيل الخدمات
- فحص حالة الخدمات

✅ **مراقبة النظام**
- الحصول على معلومات تفصيلية عن النظام
- مراقبة أداء المعالج والذاكرة
- معلومات محركات الأقراص والشبكة

## التثبيت

### المتطلبات
- Node.js v14.0.0 أو أحدث
- npm أو yarn
- نظام تشغيل Windows
- صلاحيات المسؤول

### خطوات التثبيت

```bash
# استنساخ المشروع
git clone https://github.com/elmouselhyaboshamia-dev/Services-for-cases-.git
cd Services-for-cases-

# تثبيت المكتبات
npm install

# إنشاء ملف .env
cp .env.example .env

# بدء الخادم
npm start
```

## الاستخدام

### بدء الخادم

```bash
# وضع الإنتاج
npm start

# وضع التطوير (مع إعادة تحميل تلقائي)
npm run dev
```

سيبدأ الخادم على `http://localhost:5000`

## نقاط النهاية (Endpoints)

### 1️⃣ التشخيص والصيانة

#### تشخيص النظام
```
POST /api/troubleshooting/diagnose
Content-Type: application/json

Response:
{
  "status": "success",
  "diagnostics": {
    "disk_space": {...},
    "cpu_usage": {...},
    "memory_usage": {...},
    "network": {...}
  },
  "recommendations": [...]
}
```

#### حل مشاكل الشبكة
```
POST /api/troubleshooting/network

Response:
{
  "status": "success",
  "solutions": {
    "restart_network": {...},
    "clear_dns": {...},
    "check_ipconfig": {...}
  }
}
```

#### تحسين الأداء
```
POST /api/troubleshooting/performance

Response:
{
  "status": "success",
  "actions": {
    "cleanup_temp": {...},
    "clear_cache": {...},
    "disable_startup_apps": {...},
    "scan_system": {...}
  }
}
```

#### إصلاح البرامج
```
POST /api/troubleshooting/software
Content-Type: application/json

{
  "appName": "اسم البرنامج"
}

Response:
{
  "status": "success",
  "actions": {
    "repair_app": {...},
    "reset_app": {...},
    "reinstall": {...}
  }
}
```

### 2️⃣ معلومات النظام

#### معلومات عامة
```
GET /api/system/info

Response:
{
  "status": "success",
  "system": {...}
}
```

#### معلومات المعالج
```
GET /api/system/cpu

Response:
{
  "status": "success",
  "cpu": {...},
  "load": {...}
}
```

#### معلومات الذاكرة
```
GET /api/system/memory

Response:
{
  "status": "success",
  "memory": {
    "total": "16 GB",
    "available": "8 GB",
    "used": "8 GB",
    "usagePercent": 50
  }
}
```

#### معلومات الأقراص
```
GET /api/system/disks

Response:
{
  "status": "success",
  "disks": [...],
  "partitions": [...]
}
```

#### معلومات الشبكة
```
GET /api/system/network

Response:
{
  "status": "success",
  "interfaces": [...],
  "stats": [...]
}
```

### 3️⃣ إدارة الخدمات

#### قائمة الخدمات
```
GET /api/services/list

Response:
{
  "status": "success",
  "services": [
    {"name": "AdobeARMservice", "status": "running"},
    ...
  ]
}
```

#### بدء خدمة
```
POST /api/services/start
Content-Type: application/json

{
  "serviceName": "اسم الخدمة"
}
```

#### إيقاف خدمة
```
POST /api/services/stop
Content-Type: application/json

{
  "serviceName": "اسم الخدمة"
}
```

#### إعادة تشغيل خدمة
```
POST /api/services/restart
Content-Type: application/json

{
  "serviceName": "اسم الخدمة"
}
```

#### حالة الخدمة
```
GET /api/services/status/:serviceName
```

## مثال عملي - استخدام مع cURL

```bash
# فحص صحة الخادم
curl http://localhost:5000/api/health

# تشخيص النظام
curl -X POST http://localhost:5000/api/troubleshooting/diagnose

# حل مشاكل الشبكة
curl -X POST http://localhost:5000/api/troubleshooting/network

# تحسين الأداء
curl -X POST http://localhost:5000/api/troubleshooting/performance

# إعادة تشغيل خدمة
curl -X POST http://localhost:5000/api/services/restart \
  -H "Content-Type: application/json" \
  -d '{"serviceName": "Spooler"}'
```

## ملاحظات أمان مهمة ⚠️

1. **صلاحيات المسؤول**: معظم العمليات تتطلب تشغيل الخادم كمسؤول
2. **المصادقة**: أضف طبقة مصادقة قبل النشر في الإنتاج
3. **التحقق من المدخلات**: تأكد من التحقق من جميع المدخلات من المستخدم
4. **السجلات**: تحقق من السجلات في `error.log` و `combined.log`

## هيكل المشروع

```
Services-for-cases-/
├── server.js                 # الملف الرئيسي للخادم
├── package.json              # المكتبات والمتطلبات
├── .env.example              # متغيرات البيئة
├── routes/
│   ├── troubleshooting.js   # مسارات حل المشاكل
│   ├── system.js            # مسارات معلومات النظام
│   └── services.js          # مسارات إدارة الخدمات
├── logs/
│   ├── error.log            # ملف السجلات للأخطاء
│   └── combined.log         # جميع السجلات
└── README_AR.md             # هذا الملف
```

## استكشاف الأخطاء

### المشكلة: "الخادم لا يبدأ"
**الحل:**
- تأكد من تثبيت Node.js: `node --version`
- تأكد من تثبيت المكتبات: `npm install`
- تحقق من المنفذ 5000: `netstat -ano | findstr :5000`

### المشكلة: "لا توجد صلاحيات"
**الحل:**
- شغل موجه الأوامر كمسؤول
- أو شغل الخادم مع الصلاحيات: `runas /user:Administrator cmd`

### المشكلة: "الأوامر لا تعمل"
**الحل:**
- تحقق من صلاحيات Windows
- تأكد من وجود الأداة المطلوبة على النظام
- راجع السجلات: `tail -f error.log`

## الترخيص

هذا المشروع مرخص تحت Creative Commons Zero v1.0 Universal

## المساهمة

نرحب بالمساهمات! يرجى:

1. عمل Fork للمشروع
2. إنشاء فرع جديد: `git checkout -b feature/AmazingFeature`
3. Commit التغييرات: `git commit -m 'Add AmazingFeature'`
4. Push للفرع: `git push origin feature/AmazingFeature`
5. فتح Pull Request

## التطوير المستقبلي

- [ ] إضافة واجهة رسومية ويب
- [ ] دعم التشفير والمصادقة المتقدمة
- [ ] إضافة نظام التنبيهات
- [ ] دعم النسخ الاحتياطية التلقائية
- [ ] إضافة نظام تقارير شامل

## الدعم

للمساعدة والدعم:
- 📧 البريد الإلكتروني: elmouselhyaboshamia@example.com
- 🐛 الإبلاغ عن الأخطاء: Issues
- 💬 النقاشات: Discussions

---

تم إنشاؤه بـ ❤️ بواسطة elmouselhyaboshamia-dev
