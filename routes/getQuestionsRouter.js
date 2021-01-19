const express = require('express');

const getQuestionController = require('../controllers/getQuestionsController');
const router = express.Router();
router.get('/', getQuestionController.getquestions);

module.exports = router;