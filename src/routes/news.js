const express = require('express');
const router = express.Router();

const newsCtrl = require('../controllers/NewsController');

router.use('/international', newsCtrl.international);
router.use('/:slug', newsCtrl.domestic);
router.use('/', newsCtrl.index);

module.exports = router;
