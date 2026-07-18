const express = require('express');
const router = express.Router();
const { exec } = require('child_process');
const { promisify } = require('util');

const execPromise = promisify(exec);

/**
 * مسار لتشخيص مشاكل الويندوز الشائعة
 * POST /api/troubleshooting/diagnose
 */
router.post('/diagnose', async (req, res) => {
  try {
    const { issueType } = req.body;

    const diagnostics = {
      disk_space: await checkDiskSpace(),
      cpu_usage: await checkCPUUsage(),
      memory_usage: await checkMemoryUsage(),
      network: await checkNetworkConnection(),
      timestamp: new Date().toISOString()
    };

    res.json({
      status: 'success',
      diagnostics: diagnostics,
      recommendations: generateRecommendations(diagnostics)
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'error', 
      message: error.message 
    });
  }
});

/**
 * مسار لحل مشاكل الشبكة
 * POST /api/troubleshooting/network
 */
router.post('/network', async (req, res) => {
  try {
    const solutions = {
      restart_network: await restartNetworkAdapter(),
      clear_dns: await clearDNSCache(),
      check_ipconfig: await checkIPConfig(),
      timestamp: new Date().toISOString()
    };

    res.json({
      status: 'success',
      message: 'تم إعادة تعيين الشبكة',
      solutions: solutions
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'error', 
      message: error.message 
    });
  }
});

/**
 * مسار لحل مشاكل الأداء
 * POST /api/troubleshooting/performance
 */
router.post('/performance', async (req, res) => {
  try {
    const actions = {
      cleanup_temp: await cleanupTempFiles(),
      clear_cache: await clearSystemCache(),
      disable_startup_apps: await manageStartupApps(),
      scan_system: await scanForMalware(),
      timestamp: new Date().toISOString()
    };

    res.json({
      status: 'success',
      message: 'تم تحسين أداء النظام',
      actions: actions
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'error', 
      message: error.message 
    });
  }
});

/**
 * مسار لحل مشاكل البرامج
 * POST /api/troubleshooting/software
 */
router.post('/software', async (req, res) => {
  try {
    const { appName } = req.body;

    const actions = {
      repair_app: await repairApplication(appName),
      reset_app: await resetApplication(appName),
      reinstall: await reinstallApplication(appName),
      timestamp: new Date().toISOString()
    };

    res.json({
      status: 'success',
      message: `تم محاولة إصلاح ${appName}`,
      actions: actions
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'error', 
      message: error.message 
    });
  }
});

// ============ الدوال المساعدة ============

async function checkDiskSpace() {
  try {
    const { stdout } = await execPromise('wmic logicaldisk get name,size,freespace');
    return { status: 'OK', data: stdout };
  } catch (error) {
    return { status: 'error', message: error.message };
  }
}

async function checkCPUUsage() {
  try {
    const { stdout } = await execPromise('wmic cpu get loadpercentage');
    return { status: 'OK', data: stdout };
  } catch (error) {
    return { status: 'error', message: error.message };
  }
}

async function checkMemoryUsage() {
  try {
    const { stdout } = await execPromise('wmic OS get totalvisiblememorsize,freephysicalmemory');
    return { status: 'OK', data: stdout };
  } catch (error) {
    return { status: 'error', message: error.message };
  }
}

async function checkNetworkConnection() {
  try {
    const { stdout } = await execPromise('ping google.com -n 1');
    return { status: 'OK', message: 'الاتصال بالشبكة جيد' };
  } catch (error) {
    return { status: 'error', message: 'لا يوجد اتصال بالشبكة' };
  }
}

async function restartNetworkAdapter() {
  try {
    await execPromise('ipconfig /release');
    await execPromise('ipconfig /renew');
    return { status: 'success', message: 'تم إعادة تعيين محول الشبكة' };
  } catch (error) {
    return { status: 'error', message: error.message };
  }
}

async function clearDNSCache() {
  try {
    await execPromise('ipconfig /flushdns');
    return { status: 'success', message: 'تم مسح ذاكرة DNS' };
  } catch (error) {
    return { status: 'error', message: error.message };
  }
}

async function checkIPConfig() {
  try {
    const { stdout } = await execPromise('ipconfig /all');
    return { status: 'OK', data: stdout };
  } catch (error) {
    return { status: 'error', message: error.message };
  }
}

async function cleanupTempFiles() {
  try {
    await execPromise('del /q %temp%\\*');
    return { status: 'success', message: 'تم حذف الملفات المؤقتة' };
  } catch (error) {
    return { status: 'warning', message: 'بعض الملفات قد تكون قيد الاستخدام' };
  }
}

async function clearSystemCache() {
  try {
    await execPromise('Disk Cleanup /sageset:1');
    return { status: 'success', message: 'تم مسح الذاكرة المؤقتة' };
  } catch (error) {
    return { status: 'warning', message: error.message };
  }
}

async function manageStartupApps() {
  try {
    const { stdout } = await execPromise('wmic startup get name');
    return { status: 'OK', data: stdout };
  } catch (error) {
    return { status: 'error', message: error.message };
  }
}

async function scanForMalware() {
  try {
    const { stdout } = await execPromise('powershell -Command "Update-MpSignature"');
    return { status: 'success', message: 'تم تحديث توقيعات الحماية' };
  } catch (error) {
    return { status: 'warning', message: error.message };
  }
}

async function repairApplication(appName) {
  try {
    // هذا مثال - قد تحتاج إلى تخصيص حسب التطبيق
    return { status: 'pending', message: `جاري محاولة إصلاح ${appName}` };
  } catch (error) {
    return { status: 'error', message: error.message };
  }
}

async function resetApplication(appName) {
  try {
    return { status: 'pending', message: `جاري إعادة تعيين ${appName}` };
  } catch (error) {
    return { status: 'error', message: error.message };
  }
}

async function reinstallApplication(appName) {
  try {
    return { status: 'pending', message: `جاري إعادة تثبيت ${appName}` };
  } catch (error) {
    return { status: 'error', message: error.message };
  }
}

function generateRecommendations(diagnostics) {
  const recommendations = [];
  
  if (diagnostics.cpu_usage > 80) {
    recommendations.push('استخدام المعالج مرتفع - يوصى بإغلاق البرامج غير المستخدمة');
  }
  
  if (diagnostics.memory_usage > 85) {
    recommendations.push('استخدام الذاكرة مرتفع - يوصى بإعادة تشغيل النظام');
  }
  
  if (diagnostics.disk_space < 10) {
    recommendations.push('مساحة القرص منخفضة - يوصى بحذف الملفات غير الضرورية');
  }

  return recommendations;
}

module.exports = router;
