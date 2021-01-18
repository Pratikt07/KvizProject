const express = require('express');
const editprofileController = require('../controllers/editprofileController');

router = express.Router();

router.route('/').get(editprofileController.getpage)

module.exports = router;
