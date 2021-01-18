const express = require('express');
const createQuizController = require('../controllers/createQuizController');

router = express.Router();

router.route('/').get(createQuizController.getQuizzpage).post(createQuizController.createQuiz);

module.exports = router;
