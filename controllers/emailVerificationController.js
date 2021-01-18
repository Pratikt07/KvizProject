const verifyUser = require('../models1/verifyUser.js');

module.exports.emailVerification = function (req, res) {
    verifyUser.verify(req, res);
};
