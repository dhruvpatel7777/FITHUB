const express = require('express');
const { AdminLogin } = require('../controller/adminLogin');
const router = express.Router();
// Admin Logins
router.post('/login', AdminLogin);

module.exports = router;

