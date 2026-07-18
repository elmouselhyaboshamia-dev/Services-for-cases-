const express = require('express');
const router = express.Router();
const si = require('systeminformation');

/**
 * الحصول على معلومات النظام
 * GET /api/system/info
 */
router.get('/info', async (req, res) => {
  try {
    const data = await si.osInfo();
    res.json({
      status: 'success',
      system: data
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'error', 
      message: error.message 
    });
  }
});

/**
 * الحصول على معلومات المعالج
 * GET /api/system/cpu
 */
router.get('/cpu', async (req, res) => {
  try {
    const cpu = await si.cpu();
    const currentLoad = await si.currentLoad();
    
    res.json({
      status: 'success',
      cpu: cpu,
      load: currentLoad
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'error', 
      message: error.message 
    });
  }
});

/**
 * الحصول على معلومات الذاكرة
 * GET /api/system/memory
 */
router.get('/memory', async (req, res) => {
  try {
    const mem = await si.mem();
    
    res.json({
      status: 'success',
      memory: {
        total: `${Math.round(mem.total / 1024 / 1024 / 1024)} GB`,
        available: `${Math.round(mem.available / 1024 / 1024 / 1024)} GB`,
        used: `${Math.round(mem.used / 1024 / 1024 / 1024)} GB`,
        usagePercent: Math.round((mem.used / mem.total) * 100)
      }
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'error', 
      message: error.message 
    });
  }
});

/**
 * الحصول على معلومات محركات الأقراص
 * GET /api/system/disks
 */
router.get('/disks', async (req, res) => {
  try {
    const disks = await si.diskLayout();
    const fsSize = await si.fsSize();
    
    res.json({
      status: 'success',
      disks: disks,
      partitions: fsSize
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'error', 
      message: error.message 
    });
  }
});

/**
 * الحصول على معلومات الشبكة
 * GET /api/system/network
 */
router.get('/network', async (req, res) => {
  try {
    const network = await si.networkInterfaces();
    const stats = await si.networkStats();
    
    res.json({
      status: 'success',
      interfaces: network,
      stats: stats
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'error', 
      message: error.message 
    });
  }
});

/**
 * الحصول على جميع معلومات النظام
 * GET /api/system/full
 */
router.get('/full', async (req, res) => {
  try {
    const systemInfo = await si.getAllData();
    
    res.json({
      status: 'success',
      data: systemInfo
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'error', 
      message: error.message 
    });
  }
});

module.exports = router;
