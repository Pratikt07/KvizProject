const express = require('express');
const addQuestionController = require('../controllers/addQuestionController');

router = express.Router();

router.route('/').post(addQuestionController.addquestion);

module.exports = router;
