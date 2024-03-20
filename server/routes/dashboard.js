const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');

// Dashboard Routes
router.get('/dashboard', dashboardController.dashboard);

// Export the router middleware
module.exports = router;
