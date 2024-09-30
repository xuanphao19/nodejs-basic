const express = require('express');
const router = express.Router();

const centerCtrl = require('../controllers/CenterDashboard');

router.use('/about', centerCtrl.about);
router.use('/contact', centerCtrl.contact);
router.use('/', centerCtrl.home);

module.exports = router;
