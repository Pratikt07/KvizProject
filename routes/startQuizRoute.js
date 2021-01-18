const express = require('express');
const startQuizController = require('../controllers/startQuizController');

router = express.Router();

router.route('/').get(startQuizController.getQuiz_page);

module.exports = router;
