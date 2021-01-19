const express = require('express');
const deleteQuestionController = require('../controllers/deleteQuestionController');

router = express.Router();

router.get('/', deleteQuestionController.removeQuestion);

module.exports = router;