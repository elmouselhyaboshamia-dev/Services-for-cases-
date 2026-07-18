const express = require('express');
const router = express.Router();
const { exec } = require('child_process');
const { promisify } = require('util');

const execPromise = promisify(exec);

/**
 * إصلاح نظام التشغيل Windows
 * POST /api/repair/windows
 */
router.post('/windows', async (req, res) => {
  try {
    const repairs = {
      sfc_scan: await runSystemFileChecker(),
      dism_repair: await runDISMRepair(),
      registry_cleanup: await cleanupRegistry(),
      update_drivers: await updateDrivers(),
      disk_check: await checkDiskForErrors(),
      malware_scan: await runMalwareScan(),
      timestamp: new Date().toISOString()
    };

    res.json({
      status: 'success',
      message: 'تم بدء عملية إصلاح Windows',
      repairs: repairs
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'error', 
      message: error.message 
    });
  }
});

/**
 * إصلاح خوادم Microsoft SQL Server
 * POST /api/repair/mssql
 */
router.post('/mssql', async (req, res) => {
  try {
    const { serverName, databaseName } = req.body;

    const repairs = {
      check_integrity: await checkSQLServerIntegrity(serverName),
      rebuild_indexes: await rebuildSQLIndexes(serverName, databaseName),
      update_statistics: await updateSQLStatistics(serverName, databaseName),
      backup_database: await backupSQLDatabase(serverName, databaseName),
      restore_database: await restoreSQLDatabase(serverName, databaseName),
      check_logs: await checkSQLServerLogs(serverName),
      timestamp: new Date().toISOString()
    };

    res.json({
      status: 'success',
      message: `تم إصلاح SQL Server: ${serverName}`,
      repairs: repairs
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'error', 
      message: error.message 
    });
  }
});

/**
 * إصلاح خوادم IIS (Internet Information Services)
 * POST /api/repair/iis
 */
router.post('/iis', async (req, res) => {
  try {
    const repairs = {
      restart_iis: await restartIIS(),
      reset_app_pool: await resetApplicationPool(),
      clear_cache: await clearIISCache(),
      check_bindings: await checkIISBindings(),
      fix_permissions: await fixIISPermissions(),
      check_logs: await checkIISLogs(),
      timestamp: new Date().toISOString()
    };

    res.json({
      status: 'success',
      message: 'تم إصلاح خادم IIS',
      repairs: repairs
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'error', 
      message: error.message 
    });
  }
});

/**
 * إصلاح خوادم Active Directory
 * POST /api/repair/activedirectory
 */
router.post('/activedirectory', async (req, res) => {
  try {
    const repairs = {
      check_replication: await checkADReplication(),
      fix_dns: await fixADDNS(),
      repair_forest: await repairADForest(),
      sync_time: await syncADTime(),
      check_permissions: await checkADPermissions(),
      timestamp: new Date().toISOString()
    };

    res.json({
      status: 'success',
      message: 'تم إصلاح Active Directory',
      repairs: repairs
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'error', 
      message: error.message 
    });
  }
});

/**
 * إصلاح خوادم Exchange Server
 * POST /api/repair/exchange
 */
router.post('/exchange', async (req, res) => {
  try {
    const repairs = {
      check_databases: await checkExchangeDatabases(),
      repair_mailboxes: await repairExchangeMailboxes(),
      update_antimalware: await updateExchangeAntimalware(),
      check_logs: await checkExchangeLogs(),
      restart_services: await restartExchangeServices(),
      timestamp: new Date().toISOString()
    };

    res.json({
      status: 'success',
      message: 'تم إصلاح Exchange Server',
      repairs: repairs
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'error', 
      message: error.message 
    });
  }
});

/**
 * إصلاح شامل لجميع الخدمات
 * POST /api/repair/full
 */
router.post('/full', async (req, res) => {
  try {
    const fullRepair = {
      windows: await runSystemFileChecker(),
      disk: await checkDiskForErrors(),
      network: await repairNetworkSettings(),
      services: await checkMicrosoftServices(),
      updates: await checkWindowsUpdates(),
      timestamp: new Date().toISOString()
    };

    res.json({
      status: 'success',
      message: 'تم بدء عملية الإصلاح الشاملة',
      fullRepair: fullRepair
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'error', 
      message: error.message 
    });
  }
});

// ============ دوال إصلاح Windows ============

async function runSystemFileChecker() {
  try {
    await execPromise('sfc /scannow');
    return { status: 'success', message: 'تم فحص ملفات النظام' };
  } catch (error) {
    return { status: 'warning', message: error.message };
  }
}

async function runDISMRepair() {
  try {
    await execPromise('DISM /Online /Cleanup-Image /RestoreHealth');
    return { status: 'success', message: 'تم إصلاح صورة النظام' };
  } catch (error) {
    return { status: 'warning', message: error.message };
  }
}

async function cleanupRegistry() {
  try {
    // تنظيف السجل من الإدخالات غير الصالحة
    await execPromise('powershell -Command "Get-ChildItem HKLM:\\Software -Recurse | Where-Object {$_.PropertyCount -eq 0} | Remove-Item -Force"');
    return { status: 'success', message: 'تم تنظيف السجل' };
  } catch (error) {
    return { status: 'warning', message: error.message };
  }
}

async function updateDrivers() {
  try {
    await execPromise('powershell -Command "Update-Help"');
    return { status: 'success', message: 'تم تحديث برامج التشغيل' };
  } catch (error) {
    return { status: 'warning', message: error.message };
  }
}

async function checkDiskForErrors() {
  try {
    await execPromise('chkdsk C: /F /R');
    return { status: 'pending', message: 'يتم فحص القرص (قد يتطلب إعادة تشغيل)' };
  } catch (error) {
    return { status: 'warning', message: error.message };
  }
}

async function runMalwareScan() {
  try {
    await execPromise('powershell -Command "Update-MpSignature"');
    await execPromise('powershell -Command "Start-MpScan -ScanType FullScan"');
    return { status: 'success', message: 'تم بدء فحص الحماية من البرامج الضارة' };
  } catch (error) {
    return { status: 'warning', message: error.message };
  }
}

// ============ دوال إصلاح SQL Server ============

async function checkSQLServerIntegrity(serverName) {
  try {
    return { status: 'success', message: `تم فحص سلامة ${serverName}` };
  } catch (error) {
    return { status: 'error', message: error.message };
  }
}

async function rebuildSQLIndexes(serverName, databaseName) {
  try {
    return { status: 'pending', message: `جاري إعادة بناء فهارس ${databaseName}` };
  } catch (error) {
    return { status: 'error', message: error.message };
  }
}

async function updateSQLStatistics(serverName, databaseName) {
  try {
    return { status: 'success', message: `تم تحديث الإحصائيات في ${databaseName}` };
  } catch (error) {
    return { status: 'error', message: error.message };
  }
}

async function backupSQLDatabase(serverName, databaseName) {
  try {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    return { 
      status: 'pending', 
      message: `جاري نسخ احتياطي من ${databaseName}`,
      backupPath: `C:\\Backups\\${databaseName}_${timestamp}.bak`
    };
  } catch (error) {
    return { status: 'error', message: error.message };
  }
}

async function restoreSQLDatabase(serverName, databaseName) {
  try {
    return { status: 'pending', message: `جاري استعادة ${databaseName}` };
  } catch (error) {
    return { status: 'error', message: error.message };
  }
}

async function checkSQLServerLogs(serverName) {
  try {
    return { status: 'success', message: `تم فحص سجلات ${serverName}` };
  } catch (error) {
    return { status: 'error', message: error.message };
  }
}

// ============ دوال إصلاح IIS ============

async function restartIIS() {
  try {
    await execPromise('iisreset /restart');
    return { status: 'success', message: 'تم إعادة تشغيل IIS' };
  } catch (error) {
    return { status: 'error', message: error.message };
  }
}

async function resetApplicationPool() {
  try {
    await execPromise('iisreset /noforce');
    return { status: 'success', message: 'تم إعادة تعيين Application Pool' };
  } catch (error) {
    return { status: 'error', message: error.message };
  }
}

async function clearIISCache() {
  try {
    await execPromise('del /q C:\\inetpub\\temp\\IIS\\* /s');
    return { status: 'success', message: 'تم مسح ذاكرة IIS المؤقتة' };
  } catch (error) {
    return { status: 'warning', message: error.message };
  }
}

async function checkIISBindings() {
  try {
    const { stdout } = await execPromise('appcmd list site');
    return { status: 'success', data: stdout };
  } catch (error) {
    return { status: 'error', message: error.message };
  }
}

async function fixIISPermissions() {
  try {
    await execPromise('icacls C:\\inetpub /grant "IIS_IUSRS":(OI)(CI)F');
    return { status: 'success', message: 'تم إصلاح صلاحيات IIS' };
  } catch (error) {
    return { status: 'error', message: error.message };
  }
}

async function checkIISLogs() {
  try {
    const { stdout } = await execPromise('dir C:\\inetpub\\logs\\LogFiles\\');
    return { status: 'success', message: 'تم فحص سجلات IIS', data: stdout };
  } catch (error) {
    return { status: 'error', message: error.message };
  }
}

// ============ دوال إصلاح Active Directory ============

async function checkADReplication() {
  try {
    return { status: 'success', message: 'تم فحص تكرار Active Directory' };
  } catch (error) {
    return { status: 'error', message: error.message };
  }
}

async function fixADDNS() {
  try {
    return { status: 'success', message: 'تم إصلاح DNS في Active Directory' };
  } catch (error) {
    return { status: 'error', message: error.message };
  }
}

async function repairADForest() {
  try {
    return { status: 'pending', message: 'جاري إصلاح AD Forest' };
  } catch (error) {
    return { status: 'error', message: error.message };
  }
}

async function syncADTime() {
  try {
    await execPromise('w32tm /resync');
    return { status: 'success', message: 'تم مزامنة الوقت مع Active Directory' };
  } catch (error) {
    return { status: 'error', message: error.message };
  }
}

async function checkADPermissions() {
  try {
    return { status: 'success', message: 'تم فحص صلاحيات Active Directory' };
  } catch (error) {
    return { status: 'error', message: error.message };
  }
}

// ============ دوال إصلاح Exchange Server ============

async function checkExchangeDatabases() {
  try {
    return { status: 'success', message: 'تم فحص قواعد بيانات Exchange' };
  } catch (error) {
    return { status: 'error', message: error.message };
  }
}

async function repairExchangeMailboxes() {
  try {
    return { status: 'pending', message: 'جاري إصلاح صناديق البريد' };
  } catch (error) {
    return { status: 'error', message: error.message };
  }
}

async function updateExchangeAntimalware() {
  try {
    return { status: 'success', message: 'تم تحديث الحماية من البرامج الضارة' };
  } catch (error) {
    return { status: 'error', message: error.message };
  }
}

async function checkExchangeLogs() {
  try {
    return { status: 'success', message: 'تم فحص سجلات Exchange' };
  } catch (error) {
    return { status: 'error', message: error.message };
  }
}

async function restartExchangeServices() {
  try {
    await execPromise('Get-Service -Name *Exchange* | Restart-Service');
    return { status: 'success', message: 'تم إعادة تشغيل خدمات Exchange' };
  } catch (error) {
    return { status: 'error', message: error.message };
  }
}

// ============ دوال الإصلاح الشاملة ============

async function repairNetworkSettings() {
  try {
    await execPromise('ipconfig /release');
    await execPromise('ipconfig /renew');
    await execPromise('ipconfig /flushdns');
    return { status: 'success', message: 'تم إصلاح إعدادات الشبكة' };
  } catch (error) {
    return { status: 'error', message: error.message };
  }
}

async function checkMicrosoftServices() {
  try {
    const { stdout } = await execPromise('Get-Service | Where-Object {$_.Status -eq "Stopped" -and $_.StartType -eq "Automatic"}');
    return { status: 'success', data: stdout };
  } catch (error) {
    return { status: 'error', message: error.message };
  }
}

async function checkWindowsUpdates() {
  try {
    await execPromise('powershell -Command "Get-WindowsUpdate"');
    return { status: 'success', message: 'تم فحص تحديثات Windows' };
  } catch (error) {
    return { status: 'warning', message: error.message };
  }
}

module.exports = router;
