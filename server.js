const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const winston = require('winston');

// تحميل متغيرات البيئة
dotenv.config();

const app = express();

// إعداد Logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
    new winston.transports.Console({
      format: winston.format.simple()
    })
  ]
});

// الإعدادات الأساسية
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// استيراد المسارات
const troubleshootingRoutes = require('./routes/troubleshooting');
const systemRoutes = require('./routes/system');
const servicesRoutes = require('./routes/services');

// استخدام المسارات
app.use('/api/troubleshooting', troubleshootingRoutes);
app.use('/api/system', systemRoutes);
app.use('/api/services', servicesRoutes);

// مسار الاختبار الأساسي
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'واجهة البرمجية تعمل بكفاءة',
    timestamp: new Date().toISOString()
  });
});

// معالجة الأخطاء
app.use((err, req, res, next) => {
  logger.error(err.message);
  res.status(err.status || 500).json({
    error: err.message || 'خطأ في الخادم',
    timestamp: new Date().toISOString()
  });
});

// بدء الخادم
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  logger.info(`الخادم يعمل على المنفذ ${PORT}`);
  console.log(`🚀 الخادم يعمل على: http://localhost:${PORT}`);
});

module.exports = app;
