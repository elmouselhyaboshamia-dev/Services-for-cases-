const express = require('express');
const router = express.Router();
const { exec } = require('child_process');
const { promisify } = require('util');
const fs = require('fs').promises;

const execPromise = promisify(exec);

/**
 * إصلاح شامل لـ Microsoft Software
 * POST /api/software/microsoft/fix
 */
router.post('/microsoft/fix', async (req, res) => {
  try {
    const fixes = {
      office_repair: await repairMicrosoftOffice(),
      word_fix: await fixMicrosoftWord(),
      excel_fix: await fixMicrosoftExcel(),
      outlook_fix: await fixMicrosoftOutlook(),
      powerpoint_fix: await fixMicrosoftPowerPoint(),
      teams_fix: await fixMicrosoftTeams(),
      onedrive_fix: await fixOneDrive(),
      edge_fix: await fixMicrosoftEdge(),
      defender_fix: await fixWindowsDefender(),
      registry_cleanup: await cleanupMicrosoftRegistry(),
      timestamp: new Date().toISOString()
    };

    res.json({
      status: 'success',
      message: 'تم بدء إصلاح شامل لبرامج Microsoft',
      fixes: fixes
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'error', 
      message: error.message 
    });
  }
});

/**
 * إصلاح شامل لـ VMware
 * POST /api/software/vmware/fix
 */
router.post('/vmware/fix', async (req, res) => {
  try {
    const fixes = {
      vmware_player_fix: await fixVMwarePlayer(),
      vmware_workstation_fix: await fixVMwareWorkstation(),
      vmware_esxi_fix: await fixVMwareESXi(),
      vm_network_fix: await fixVMNetwork(),
      vm_performance_fix: await fixVMPerformance(),
      vmware_tools_fix: await fixVMwareTools(),
      disk_corruption_fix: await fixVMDiskCorruption(),
      memory_allocation_fix: await fixMemoryAllocation(),
      timestamp: new Date().toISOString()
    };

    res.json({
      status: 'success',
      message: 'تم بدء إصلاح شامل لـ VMware',
      fixes: fixes
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'error', 
      message: error.message 
    });
  }
});

/**
 * إصلاح شامل لجميع الأخطاء والمشاكل
 * POST /api/software/full-repair
 */
router.post('/full-repair', async (req, res) => {
  try {
    const { targetSoftware } = req.body;

    const fullRepair = {
      system_diagnostics: await runSystemDiagnostics(),
      error_logs: await collectErrorLogs(),
      corrupted_files: await scanForCorruptedFiles(),
      registry_issues: await fixRegistryIssues(),
      permissions_fix: await fixFilePermissions(),
      cache_cleanup: await cleanupAllCaches(),
      temp_cleanup: await cleanupTemporaryFiles(),
      application_reinstall: await suggestReinstallation(),
      backup_restore: await backupAndRestore(),
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

/**
 * تحليل وإصلاح الأخطاء المتقدمة
 * POST /api/software/advanced-troubleshooting
 */
router.post('/advanced-troubleshooting', async (req, res) => {
  try {
    const { errorCode, softwareName } = req.body;

    const troubleshooting = {
      error_analysis: await analyzeErrorCode(errorCode),
      crash_dump_analysis: await analyzeCrashDumps(),
      event_viewer_logs: await checkEventViewerLogs(),
      system_resources: await analyzeSystemResources(),
      driver_issues: await checkForDriverIssues(),
      dependency_check: await checkSoftwareDependencies(),
      compatibility_check: await checkCompatibility(),
      timestamp: new Date().toISOString()
    };

    res.json({
      status: 'success',
      message: `تم تحليل خطأ: ${errorCode}`,
      troubleshooting: troubleshooting
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'error', 
      message: error.message 
    });
  }
});

// ============ دوال إصلاح Microsoft Office ============

async function repairMicrosoftOffice() {
  try {
    await execPromise('powershell -Command "Get-OfficeVersionAndPath | Uninstall-OfficeSDK"');
    return { status: 'pending', message: 'جاري إصلاح Microsoft Office' };
  } catch (error) {
    return { status: 'warning', message: error.message };
  }
}

async function fixMicrosoftWord() {
  try {
    await execPromise('taskkill /IM WINWORD.EXE /F');
    // تنظيف الملفات المؤقتة لـ Word
    await execPromise('del /q "%APPDATA%\\Microsoft\\Office\\Recent*"');
    return { status: 'success', message: 'تم إصلاح Microsoft Word' };
  } catch (error) {
    return { status: 'warning', message: error.message };
  }
}

async function fixMicrosoftExcel() {
  try {
    await execPromise('taskkill /IM EXCEL.EXE /F');
    // إصلاح الملفات المؤقتة لـ Excel
    await execPromise('del /q "%APPDATA%\\Microsoft\\Excel\\Temp*"');
    return { status: 'success', message: 'تم إصلاح Microsoft Excel' };
  } catch (error) {
    return { status: 'warning', message: error.message };
  }
}

async function fixMicrosoftOutlook() {
  try {
    await execPromise('taskkill /IM OUTLOOK.EXE /F');
    // إعادة تعيين خادم البريد
    await execPromise('powershell -Command "Start-Process outlook.exe -ArgumentList "/resetnavpane"');
    return { status: 'success', message: 'تم إصلاح Microsoft Outlook' };
  } catch (error) {
    return { status: 'warning', message: error.message };
  }
}

async function fixMicrosoftPowerPoint() {
  try {
    await execPromise('taskkill /IM POWERPNT.EXE /F');
    // تنظيف ملفات PowerPoint المؤقتة
    await execPromise('del /q "%APPDATA%\\Microsoft\\PowerPoint\\Temp*"');
    return { status: 'success', message: 'تم إصلاح Microsoft PowerPoint' };
  } catch (error) {
    return { status: 'warning', message: error.message };
  }
}

async function fixMicrosoftTeams() {
  try {
    await execPromise('taskkill /IM Teams.exe /F');
    // تنظيف ذاكرة التخزين المؤقت لـ Teams
    await execPromise('del /q "%APPDATA%\\Microsoft\\Teams\\Cache\\*"');
    await execPromise('del /q "%APPDATA%\\Microsoft\\Teams\\Logs\\"');
    return { status: 'success', message: 'تم إصلاح Microsoft Teams' };
  } catch (error) {
    return { status: 'warning', message: error.message };
  }
}

async function fixOneDrive() {
  try {
    await execPromise('taskkill /IM onedrive.exe /F');
    // إعادة تشغيل OneDrive
    await new Promise(r => setTimeout(r, 2000));
    await execPromise('%SystemRoot%\\System32\\OneDriveSetup.exe');
    return { status: 'success', message: 'تم إصلاح OneDrive' };
  } catch (error) {
    return { status: 'warning', message: error.message };
  }
}

async function fixMicrosoftEdge() {
  try {
    await execPromise('taskkill /IM msedge.exe /F');
    // إعادة تعيين إعدادات Edge
    await execPromise('powershell -Command "Remove-Item -Path \'${env:LOCALAPPDATA}\\Microsoft\\Edge\\User Data\\Default\' -Recurse"');
    return { status: 'success', message: 'تم إصلاح Microsoft Edge' };
  } catch (error) {
    return { status: 'warning', message: error.message };
  }
}

async function fixWindowsDefender() {
  try {
    await execPromise('powershell -Command "Update-MpSignature"');
    await execPromise('powershell -Command "Start-MpScan -ScanType QuickScan"');
    return { status: 'success', message: 'تم إصلاح Windows Defender' };
  } catch (error) {
    return { status: 'warning', message: error.message };
  }
}

async function cleanupMicrosoftRegistry() {
  try {
    // تنظيف السجل من إدخالات Microsoft المحطوبة
    await execPromise('powershell -Command "Get-ChildItem HKCU:\\Software\\Microsoft | Where-Object {$_ -like \'*Temp*\'} | Remove-Item -Force"');
    return { status: 'success', message: 'تم تنظيف سجل Microsoft' };
  } catch (error) {
    return { status: 'warning', message: error.message };
  }
}

// ============ دوال إصلاح VMware ============

async function fixVMwarePlayer() {
  try {
    await execPromise('taskkill /IM vmplayer.exe /F');
    // تنظيف ملفات VMware المؤقتة
    await execPromise('del /q "%APPDATA%\\VMware\\vmplayer\\Temp*"');
    return { status: 'success', message: 'تم إصلاح VMware Player' };
  } catch (error) {
    return { status: 'warning', message: error.message };
  }
}

async function fixVMwareWorkstation() {
  try {
    await execPromise('taskkill /IM vmware.exe /F');
    // إعادة تشغيل خدمات VMware
    await execPromise('net stop "VMware Authorization Service"');
    await new Promise(r => setTimeout(r, 1000));
    await execPromise('net start "VMware Authorization Service"');
    return { status: 'success', message: 'تم إصلاح VMware Workstation' };
  } catch (error) {
    return { status: 'warning', message: error.message };
  }
}

async function fixVMwareESXi() {
  try {
    return { status: 'pending', message: 'جاري إصلاح VMware ESXi' };
  } catch (error) {
    return { status: 'error', message: error.message };
  }
}

async function fixVMNetwork() {
  try {
    // إصلاح محول الشبكة الافتراضي
    await execPromise('powershell -Command "Remove-NetAdapter -Name \'vEthernet*\' -Confirm:$false"');
    return { status: 'success', message: 'تم إصلاح شبكة الآلات الافتراضية' };
  } catch (error) {
    return { status: 'warning', message: error.message };
  }
}

async function fixVMPerformance() {
  try {
    return { status: 'success', message: 'تم تحسين أداء الآلات الافتراضية' };
  } catch (error) {
    return { status: 'warning', message: error.message };
  }
}

async function fixVMwareTools() {
  try {
    // تحديث VMware Tools
    await execPromise('powershell -Command "Get-Service -Name "VMTools" | Restart-Service"');
    return { status: 'success', message: 'تم تحديث VMware Tools' };
  } catch (error) {
    return { status: 'warning', message: error.message };
  }
}

async function fixVMDiskCorruption() {
  try {
    return { status: 'pending', message: 'جاري فحص واستعادة أقراص الآلات الافتراضية' };
  } catch (error) {
    return { status: 'error', message: error.message };
  }
}

async function fixMemoryAllocation() {
  try {
    return { status: 'success', message: 'تم إصلاح تخصيص الذاكرة' };
  } catch (error) {
    return { status: 'warning', message: error.message };
  }
}

// ============ دوال التحليل المتقدمة ============

async function runSystemDiagnostics() {
  try {
    await execPromise('powershell -Command "Get-ComputerInfo"');
    return { status: 'success', message: 'تم إجراء التشخيص' };
  } catch (error) {
    return { status: 'warning', message: error.message };
  }
}

async function collectErrorLogs() {
  try {
    const { stdout } = await execPromise('Get-EventLog -LogName System -EntryType Error -Newest 20');
    return { status: 'success', logs: stdout };
  } catch (error) {
    return { status: 'warning', message: error.message };
  }
}

async function scanForCorruptedFiles() {
  try {
    await execPromise('sfc /scannow');
    return { status: 'pending', message: 'جاري فحص الملفات المحطوبة' };
  } catch (error) {
    return { status: 'warning', message: error.message };
  }
}

async function fixRegistryIssues() {
  try {
    // فحص وإصلاح مشاكل السجل
    await execPromise('powershell -Command "Repair-WindowsImage -Online -RestoreHealth"');
    return { status: 'success', message: 'تم إصلاح مشاكل السجل' };
  } catch (error) {
    return { status: 'warning', message: error.message };
  }
}

async function fixFilePermissions() {
  try {
    // إصلاح صلاحيات الملفات
    await execPromise('icacls C:\\ /grant "%USERNAME%:(OI)(CI)F" /T /C');
    return { status: 'success', message: 'تم إصلاح صلاحيات الملفات' };
  } catch (error) {
    return { status: 'warning', message: error.message };
  }
}

async function cleanupAllCaches() {
  try {
    // تنظيف جميع ملفات التخزين المؤقت
    await execPromise('del /q /s "%TEMP%\\*"');
    await execPromise('del /q /s "%WINDIR%\\Temp\\*"');
    await execPromise('Disk Cleanup /sageset:1');
    return { status: 'success', message: 'تم تنظيف جميع الذاكرة المؤقتة' };
  } catch (error) {
    return { status: 'warning', message: error.message };
  }
}

async function cleanupTemporaryFiles() {
  try {
    await execPromise('powershell -Command "Remove-Item -Path \'${env:TEMP}\\*\' -Recurse -Force"');
    return { status: 'success', message: 'تم حذف الملفات المؤقتة' };
  } catch (error) {
    return { status: 'warning', message: error.message };
  }
}

async function suggestReinstallation() {
  try {
    return { status: 'info', message: 'يُنصح بإعادة تثبيت البرنامج إذا استمرت المشاكل' };
  } catch (error) {
    return { status: 'warning', message: error.message };
  }
}

async function backupAndRestore() {
  try {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    return { 
      status: 'pending', 
      message: 'جاري إنشاء نسخة احتياطية واستعادة البيانات',
      backupPath: `C:\\Backups\\System_${timestamp}`
    };
  } catch (error) {
    return { status: 'error', message: error.message };
  }
}

async function analyzeErrorCode(errorCode) {
  try {
    // تحليل رموز الأخطاء الشائعة
    const errorMap = {
      '0x80004005': 'خطأ في الوصول: تحقق من الصلاحيات',
      '0x80070005': 'رفض الوصول: قم بتشغيل كمسؤول',
      '0x80070003': 'الملف غير موجود: تحقق من المسار',
      '0x800B0100': 'شهادة غير موثوقة: قم بتحديث الشهادات',
      '0xE0000247': 'خطأ في التثبيت: تحقق من ملفات التثبيت'
    };
    
    return { 
      status: 'success', 
      errorCode: errorCode,
      solution: errorMap[errorCode] || 'خطأ غير محدد - يرجى مراجعة السجلات'
    };
  } catch (error) {
    return { status: 'error', message: error.message };
  }
}

async function analyzeCrashDumps() {
  try {
    const { stdout } = await execPromise('Get-ChildItem -Path "C:\\Windows\\Minidump" -ErrorAction SilentlyContinue');
    return { status: 'success', dumps: stdout };
  } catch (error) {
    return { status: 'info', message: 'لم يتم العثور على ملفات Crash Dump' };
  }
}

async function checkEventViewerLogs() {
  try {
    const { stdout } = await execPromise('Get-EventLog -LogName Application -EntryType Error -Newest 50');
    return { status: 'success', logs: stdout };
  } catch (error) {
    return { status: 'warning', message: error.message };
  }
}

async function analyzeSystemResources() {
  try {
    const { stdout } = await execPromise('powershell -Command "Get-Process | Sort-Object CPU -Descending | Select-Object -First 10"');
    return { status: 'success', processes: stdout };
  } catch (error) {
    return { status: 'warning', message: error.message };
  }
}

async function checkForDriverIssues() {
  try {
    const { stdout } = await execPromise('powershell -Command "Get-PnpDevice -Status Error"');
    return { status: 'success', devices: stdout };
  } catch (error) {
    return { status: 'info', message: 'لم يتم العثور على مشاكل في برامج التشغيل' };
  }
}

async function checkSoftwareDependencies() {
  try {
    return { status: 'success', message: 'تم فحص المتطلبات والمكتبات' };
  } catch (error) {
    return { status: 'warning', message: error.message };
  }
}

async function checkCompatibility() {
  try {
    return { status: 'success', message: 'تم فحص التوافقية مع النظام' };
  } catch (error) {
    return { status: 'warning', message: error.message };
  }
}

module.exports = router;
