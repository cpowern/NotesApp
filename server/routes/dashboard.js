const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middleware/checkAuth');
const dashboardController = require('../controllers/dashboardController');

// Dashboard Routes
router.get('/dashboard', isLoggedIn, dashboardController.dashboard);

// Export the router middleware
module.exports = router;
