const express = require('express');
const checkFolderController = require('../controllers/addQuestionController');

router = express.Router();

router.route('/').get(checkFolderController.check_status);

module.exports = router;
