const express = require('express');

const doneQuizController = require('../controllers/doneQuizController.js');

router = express.Router();

router.route('/').get(doneQuizController.completeQuiz).post(doneQuizController.completed);

module.exports = router;
