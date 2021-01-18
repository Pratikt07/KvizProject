const express = require('express');
const addResponseController = require('../controllers/addResponseController');

router = express.Router();

router.route('/').post(addResponseController.addResponse);

module.exports = router;
