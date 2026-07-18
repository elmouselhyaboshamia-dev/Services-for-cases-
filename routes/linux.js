const express = require('express');
const router = express.Router();
const { exec } = require('child_process');
const { promisify } = require('util');

const execPromise = promisify(exec);

/**
 * الحصول على معلومات نظام Linux
 * GET /api/linux/info
 */
router.get('/info', async (req, res) => {
  try {
    const info = {
      os_info: await getOSInfo(),
      kernel_info: await getKernelInfo(),
      system_uptime: await getSystemUptime(),
      hostname: await getHostname(),
      timestamp: new Date().toISOString()
    };

    res.json({
      status: 'success',
      info: info
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'error', 
      message: error.message 
    });
  }
});

/**
 * فحص صحة نظام Linux
 * GET /api/linux/health
 */
router.get('/health', async (req, res) => {
  try {
    const health = {
      disk_usage: await checkDiskUsage(),
      memory_usage: await checkMemoryUsage(),
      cpu_load: await checkCPULoad(),
      processes: await getProcessInfo(),
      network: await checkNetworkStatus(),
      services: await checkSystemServices(),
      timestamp: new Date().toISOString()
    };

    res.json({
      status: 'success',
      health: health
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'error', 
      message: error.message 
    });
  }
});

/**
 * حل مشاكل Linux الشائعة
 * POST /api/linux/troubleshoot
 */
router.post('/troubleshoot', async (req, res) => {
  try {
    const { issueType } = req.body;

    const troubleshoots = {
      disk_space_issue: await fixDiskSpaceIssue(),
      memory_leak: await fixMemoryLeak(),
      cpu_high_usage: await fixHighCPUUsage(),
      network_connectivity: await fixNetworkConnectivity(),
      permission_denied: await fixPermissionDenied(),
      corrupted_packages: await fixCorruptedPackages(),
      broken_dependencies: await fixBrokenDependencies(),
      timestamp: new Date().toISOString()
    };

    res.json({
      status: 'success',
      message: 'تم بدء حل المشاكل',
      troubleshoots: troubleshoots
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'error', 
      message: error.message 
    });
  }
});

/**
 * إدارة المستودعات (Repositories)
 * POST /api/linux/repositories
 */
router.post('/repositories', async (req, res) => {
  try {
    const { action } = req.body;

    const repo_management = {
      list_repos: await listRepositories(),
      update_repos: await updateRepositories(),
      add_ppa: await addPPA(),
      remove_old_repos: await removeOldRepositories(),
      timestamp: new Date().toISOString()
    };

    res.json({
      status: 'success',
      message: 'تم إدارة المستودعات',
      management: repo_management
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'error', 
      message: error.message 
    });
  }
});

/**
 * إدارة المكتبات والحزم
 * POST /api/linux/packages
 */
router.post('/packages', async (req, res) => {
  try {
    const { action, packageName } = req.body;

    const package_management = {
      update_system: await updateSystem(),
      install_package: await installPackage(packageName),
      remove_package: await removePackage(packageName),
      list_installed: await listInstalledPackages(),
      fix_broken_packages: await fixBrokenPackages(),
      clean_cache: await cleanPackageCache(),
      timestamp: new Date().toISOString()
    };

    res.json({
      status: 'success',
      message: 'تم إدارة الحزم',
      management: package_management
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'error', 
      message: error.message 
    });
  }
});

/**
 * فحص وإصلاح الملفات والأنظمة
 * POST /api/linux/file-system
 */
router.post('/file-system', async (req, res) => {
  try {
    const fixes = {
      check_disk_errors: await checkDiskErrors(),
      repair_filesystem: await repairFilesystem(),
      fix_permissions: await fixFilePermissions(),
      clean_broken_symlinks: await cleanBrokenSymlinks(),
      recover_deleted_files: await recoverDeletedFiles(),
      optimize_filesystem: await optimizeFilesystem(),
      timestamp: new Date().toISOString()
    };

    res.json({
      status: 'success',
      message: 'تم فحص وإصلاح نظام الملفات',
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
 * إدارة المستخدمين والصلاحيات
 * POST /api/linux/users
 */
router.post('/users', async (req, res) => {
  try {
    const { action } = req.body;

    const user_management = {
      list_users: await listUsers(),
      list_groups: await listGroups(),
      fix_sudo_access: await fixSudoAccess(),
      fix_file_ownership: await fixFileOwnership(),
      set_permissions: await setCorrectPermissions(),
      check_user_quotas: await checkUserQuotas(),
      timestamp: new Date().toISOString()
    };

    res.json({
      status: 'success',
      message: 'تم إدارة المستخدمين والصلاحيات',
      management: user_management
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'error', 
      message: error.message 
    });
  }
});

/**
 * فحص وإصلاح الخدمات
 * POST /api/linux/services
 */
router.post('/services', async (req, res) => {
  try {
    const fixes = {
      list_services: await listServices(),
      enable_service: await enableService(),
      disable_service: await disableService(),
      restart_services: await restartFailedServices(),
      check_failed_units: await checkFailedUnits(),
      fix_startup_issues: await fixStartupIssues(),
      timestamp: new Date().toISOString()
    };

    res.json({
      status: 'success',
      message: 'تم فحص الخدمات',
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
 * فحص الأمان والتحديثات
 * POST /api/linux/security
 */
router.post('/security', async (req, res) => {
  try {
    const security = {
      check_updates: await checkSecurityUpdates(),
      install_updates: await installSecurityUpdates(),
      check_failed_logins: await checkFailedLogins(),
      scan_open_ports: await scanOpenPorts(),
      check_firewall: await checkFirewall(),
      check_sudo_logs: await checkSudoLogs(),
      scan_malware: await scanForMalware(),
      timestamp: new Date().toISOString()
    };

    res.json({
      status: 'success',
      message: 'تم فحص الأمان',
      security: security
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'error', 
      message: error.message 
    });
  }
});

// ============ دوال الحصول على المعلومات ============

async function getOSInfo() {
  try {
    const { stdout } = await execPromise('cat /etc/os-release');
    return { status: 'success', data: stdout };
  } catch (error) {
    return { status: 'error', message: error.message };
  }
}

async function getKernelInfo() {
  try {
    const { stdout } = await execPromise('uname -a');
    return { status: 'success', data: stdout };
  } catch (error) {
    return { status: 'error', message: error.message };
  }
}

async function getSystemUptime() {
  try {
    const { stdout } = await execPromise('uptime');
    return { status: 'success', data: stdout };
  } catch (error) {
    return { status: 'error', message: error.message };
  }
}

async function getHostname() {
  try {
    const { stdout } = await execPromise('hostname');
    return { status: 'success', data: stdout };
  } catch (error) {
    return { status: 'error', message: error.message };
  }
}

// ============ دوال فحص الصحة ============

async function checkDiskUsage() {
  try {
    const { stdout } = await execPromise('df -h');
    return { status: 'success', data: stdout };
  } catch (error) {
    return { status: 'error', message: error.message };
  }
}

async function checkMemoryUsage() {
  try {
    const { stdout } = await execPromise('free -h');
    return { status: 'success', data: stdout };
  } catch (error) {
    return { status: 'error', message: error.message };
  }
}

async function checkCPULoad() {
  try {
    const { stdout } = await execPromise('top -bn1 | head -n 3');
    return { status: 'success', data: stdout };
  } catch (error) {
    return { status: 'error', message: error.message };
  }
}

async function getProcessInfo() {
  try {
    const { stdout } = await execPromise('ps aux --sort=-%cpu | head -n 10');
    return { status: 'success', data: stdout };
  } catch (error) {
    return { status: 'error', message: error.message };
  }
}

async function checkNetworkStatus() {
  try {
    const { stdout } = await execPromise('ifconfig');
    return { status: 'success', data: stdout };
  } catch (error) {
    return { status: 'error', message: error.message };
  }
}

async function checkSystemServices() {
  try {
    const { stdout } = await execPromise('systemctl list-units --type=service --state=running');
    return { status: 'success', data: stdout };
  } catch (error) {
    return { status: 'error', message: error.message };
  }
}

// ============ دوال حل المشاكل ============

async function fixDiskSpaceIssue() {
  try {
    await execPromise('sudo apt-get clean && sudo apt-get autoclean');
    return { status: 'success', message: 'تم تنظيف مساحة القرص' };
  } catch (error) {
    return { status: 'warning', message: error.message };
  }
}

async function fixMemoryLeak() {
  try {
    await execPromise('sudo sync && sudo echo 3 > /proc/sys/vm/drop_caches');
    return { status: 'success', message: 'تم تنظيف الذاكرة' };
  } catch (error) {
    return { status: 'warning', message: error.message };
  }
}

async function fixHighCPUUsage() {
  try {
    const { stdout } = await execPromise('ps aux --sort=-%cpu | head -n 5');
    return { status: 'success', message: 'تم تحديد العمليات التي تستهلك CPU', data: stdout };
  } catch (error) {
    return { status: 'warning', message: error.message };
  }
}

async function fixNetworkConnectivity() {
  try {
    await execPromise('sudo systemctl restart networking');
    return { status: 'success', message: 'تم إعادة تشغيل الشبكة' };
  } catch (error) {
    return { status: 'warning', message: error.message };
  }
}

async function fixPermissionDenied() {
  try {
    return { status: 'info', message: 'يرجى تحديد الملف أو المجلد المطلوب' };
  } catch (error) {
    return { status: 'error', message: error.message };
  }
}

async function fixCorruptedPackages() {
  try {
    await execPromise('sudo apt --fix-broken install');
    return { status: 'success', message: 'تم إصلاح الحزم المحطوبة' };
  } catch (error) {
    return { status: 'warning', message: error.message };
  }
}

async function fixBrokenDependencies() {
  try {
    await execPromise('sudo apt --fix-missing install');
    return { status: 'success', message: 'تم إصلاح المتطلبات المحطوبة' };
  } catch (error) {
    return { status: 'warning', message: error.message };
  }
}

// ============ دوال إدارة المستودعات ============

async function listRepositories() {
  try {
    const { stdout } = await execPromise('grep -r "^deb" /etc/apt/sources.list*');
    return { status: 'success', data: stdout };
  } catch (error) {
    return { status: 'error', message: error.message };
  }
}

async function updateRepositories() {
  try {
    await execPromise('sudo apt-get update');
    return { status: 'success', message: 'تم تحديث المستودعات' };
  } catch (error) {
    return { status: 'warning', message: error.message };
  }
}

async function addPPA() {
  try {
    return { status: 'info', message: 'يرجى تحديد PPA المطلوب إضافته' };
  } catch (error) {
    return { status: 'error', message: error.message };
  }
}

async function removeOldRepositories() {
  try {
    await execPromise('sudo apt-get autoremove');
    return { status: 'success', message: 'تم إزالة المستودعات القديمة' };
  } catch (error) {
    return { status: 'warning', message: error.message };
  }
}

// ============ دوال إدارة الحزم ============

async function updateSystem() {
  try {
    await execPromise('sudo apt-get update && sudo apt-get upgrade -y');
    return { status: 'success', message: 'تم تحديث النظام' };
  } catch (error) {
    return { status: 'warning', message: error.message };
  }
}

async function installPackage(packageName) {
  try {
    if (!packageName) return { status: 'error', message: 'يرجى تحديد اسم الحزمة' };
    await execPromise(`sudo apt-get install -y ${packageName}`);
    return { status: 'success', message: `تم تثبيت ${packageName}` };
  } catch (error) {
    return { status: 'error', message: error.message };
  }
}

async function removePackage(packageName) {
  try {
    if (!packageName) return { status: 'error', message: 'يرجى تحديد اسم الحزمة' };
    await execPromise(`sudo apt-get remove -y ${packageName}`);
    return { status: 'success', message: `تم حذف ${packageName}` };
  } catch (error) {
    return { status: 'error', message: error.message };
  }
}

async function listInstalledPackages() {
  try {
    const { stdout } = await execPromise('dpkg -l | wc -l');
    return { status: 'success', message: `عدد الحزم المثبتة: ${stdout}` };
  } catch (error) {
    return { status: 'error', message: error.message };
  }
}

async function fixBrokenPackages() {
  try {
    await execPromise('sudo dpkg --configure -a');
    return { status: 'success', message: 'تم إصلاح الحزم المحطوبة' };
  } catch (error) {
    return { status: 'warning', message: error.message };
  }
}

async function cleanPackageCache() {
  try {
    await execPromise('sudo apt-get clean && sudo apt-get autoclean');
    return { status: 'success', message: 'تم تنظيف ذاكرة تخزين الحزم' };
  } catch (error) {
    return { status: 'warning', message: error.message };
  }
}

// ============ دوال نظام الملفات ============

async function checkDiskErrors() {
  try {
    const { stdout } = await execPromise('sudo fsck -n /');
    return { status: 'pending', message: 'جاري فحص القرص للأخطاء', data: stdout };
  } catch (error) {
    return { status: 'warning', message: error.message };
  }
}

async function repairFilesystem() {
  try {
    return { status: 'pending', message: 'جاري إصلاح نظام الملفات (قد يتطلب إعادة تشغيل)' };
  } catch (error) {
    return { status: 'error', message: error.message };
  }
}

async function fixFilePermissions() {
  try {
    await execPromise('sudo chmod 755 -R ~');
    return { status: 'success', message: 'تم إصلاح صلاحيات الملفات' };
  } catch (error) {
    return { status: 'warning', message: error.message };
  }
}

async function cleanBrokenSymlinks() {
  try {
    await execPromise('find ~ -type l ! -exec test -e {} \\; -delete');
    return { status: 'success', message: 'تم حذف الروابط المحطوبة' };
  } catch (error) {
    return { status: 'warning', message: error.message };
  }
}

async function recoverDeletedFiles() {
  try {
    return { status: 'info', message: 'يُنصح باستخدام أداة testdisk أو photorec للاسترجاع' };
  } catch (error) {
    return { status: 'error', message: error.message };
  }
}

async function optimizeFilesystem() {
  try {
    await execPromise('sudo fstrim -v /');
    return { status: 'success', message: 'تم تحسين نظام الملفات' };
  } catch (error) {
    return { status: 'warning', message: error.message };
  }
}

// ============ دوال إدارة المستخدمين ============

async function listUsers() {
  try {
    const { stdout } = await execPromise('cat /etc/passwd | cut -d: -f1');
    return { status: 'success', data: stdout };
  } catch (error) {
    return { status: 'error', message: error.message };
  }
}

async function listGroups() {
  try {
    const { stdout } = await execPromise('cat /etc/group | cut -d: -f1');
    return { status: 'success', data: stdout };
  } catch (error) {
    return { status: 'error', message: error.message };
  }
}

async function fixSudoAccess() {
  try {
    return { status: 'info', message: 'تحقق من ملف /etc/sudoers باستخدام visudo' };
  } catch (error) {
    return { status: 'error', message: error.message };
  }
}

async function fixFileOwnership() {
  try {
    await execPromise('sudo chown $USER:$USER ~/ -R');
    return { status: 'success', message: 'تم إصلاح ملكية الملفات' };
  } catch (error) {
    return { status: 'warning', message: error.message };
  }
}

async function setCorrectPermissions() {
  try {
    await execPromise('sudo chmod 644 ~/.* 2>/dev/null; sudo chmod 700 ~');
    return { status: 'success', message: 'تم تعيين الصلاحيات الصحيحة' };
  } catch (error) {
    return { status: 'warning', message: error.message };
  }
}

async function checkUserQuotas() {
  try {
    const { stdout } = await execPromise('quota -u');
    return { status: 'success', data: stdout };
  } catch (error) {
    return { status: 'warning', message: error.message };
  }
}

// ============ دوال إدارة الخدمات ============

async function listServices() {
  try {
    const { stdout } = await execPromise('systemctl list-units --type=service');
    return { status: 'success', data: stdout };
  } catch (error) {
    return { status: 'error', message: error.message };
  }
}

async function enableService() {
  try {
    return { status: 'info', message: 'يرجى تحديد اسم الخدمة' };
  } catch (error) {
    return { status: 'error', message: error.message };
  }
}

async function disableService() {
  try {
    return { status: 'info', message: 'يرجى تحديد اسم الخدمة' };
  } catch (error) {
    return { status: 'error', message: error.message };
  }
}

async function restartFailedServices() {
  try {
    await execPromise('sudo systemctl restart --failed');
    return { status: 'success', message: 'تم إعادة تشغيل الخدمات المفشلة' };
  } catch (error) {
    return { status: 'warning', message: error.message };
  }
}

async function checkFailedUnits() {
  try {
    const { stdout } = await execPromise('systemctl list-units --failed');
    return { status: 'success', data: stdout };
  } catch (error) {
    return { status: 'error', message: error.message };
  }
}

async function fixStartupIssues() {
  try {
    await execPromise('sudo systemctl daemon-reload');
    return { status: 'success', message: 'تم إصلاح مشاكل بدء التشغيل' };
  } catch (error) {
    return { status: 'warning', message: error.message };
  }
}

// ============ دوال الأمان ============

async function checkSecurityUpdates() {
  try {
    await execPromise('sudo apt list --upgradable');
    return { status: 'success', message: 'تم فحص التحديثات الأمنية' };
  } catch (error) {
    return { status: 'warning', message: error.message };
  }
}

async function installSecurityUpdates() {
  try {
    await execPromise('sudo apt-get update && sudo apt-get upgrade -y');
    return { status: 'success', message: 'تم تثبيت التحديثات الأمنية' };
  } catch (error) {
    return { status: 'warning', message: error.message };
  }
}

async function checkFailedLogins() {
  try {
    const { stdout } = await execPromise('sudo grep "Failed password" /var/log/auth.log | wc -l');
    return { status: 'success', message: `محاولات تسجيل دخول فاشلة: ${stdout}` };
  } catch (error) {
    return { status: 'error', message: error.message };
  }
}

async function scanOpenPorts() {
  try {
    const { stdout } = await execPromise('sudo netstat -tuln | grep LISTEN');
    return { status: 'success', data: stdout };
  } catch (error) {
    return { status: 'error', message: error.message };
  }
}

async function checkFirewall() {
  try {
    const { stdout } = await execPromise('sudo ufw status');
    return { status: 'success', data: stdout };
  } catch (error) {
    return { status: 'error', message: error.message };
  }
}

async function checkSudoLogs() {
  try {
    const { stdout } = await execPromise('sudo grep "sudo" /var/log/auth.log | tail -n 20');
    return { status: 'success', data: stdout };
  } catch (error) {
    return { status: 'error', message: error.message };
  }
}

async function scanForMalware() {
  try {
    return { status: 'info', message: 'يُنصح باستخدام ClamAV أو Rootkit Hunter' };
  } catch (error) {
    return { status: 'error', message: error.message };
  }
}

module.exports = router;
