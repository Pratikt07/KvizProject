const express = require('express');
const editprofileController = require('../controllers/editprofileController');

router = express.Router();

router.route('/').get(editprofileController.getpage).post(editprofileController.editprofile);

module.exports = router;
