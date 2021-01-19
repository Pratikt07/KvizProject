const express = require('express');

const premiumController = require('../controllers/premiumController.js');

router = express.Router();

router.route('/').post(premiumController.check_payment);

module.exports = router;
