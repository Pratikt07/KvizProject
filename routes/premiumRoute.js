const express = require('express');

const premiumController = require('../controllers/premiumController.js');

router = express.Router();

router.route('/').get(premiumController.getPremiumPage).post(premiumController.buyingPackage);

module.exports = router;
