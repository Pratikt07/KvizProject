const express = require('express');

const profileController = require('../controllers/profileController.js');

router = express.Router();

router.route('/').get(profileController.getprofile).post(profileController.editprofile);

module.exports = router;
