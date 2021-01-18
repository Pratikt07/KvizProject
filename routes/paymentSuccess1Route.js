const express = require('express');

const paymentsuccess1Controller = require('../controllers/paymentsuccess1Controller.js');

router = express.Router();

router.route('/').get(paymentsuccess1Controller.success_msg)

module.exports = router;
