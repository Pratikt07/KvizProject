const express = require('express');
const offlineQuizController = require('../controllers/offlineQuizController');

router = express.Router();

router.route('/').get(offlineQuizController.fetchQuizz)

module.exports = router;
