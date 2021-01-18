const express = require('express');
const savingQuizInitialsController = require('../controllers/savingQuizInitialsController.js');

router = express.Router();

router.route('/').post(savingQuizInitialsController.saveResult);

module.exports = router;
