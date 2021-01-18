const VerifyPasswordLink = require('../models1/verifyResetPasswordLink.js');
const resettingPassword = require('../models1/resettingPassword.js');

exports.resetPasswordmail = function (req, res) {
    VerifyPasswordLink.resetpasswordemailverify(req, res);
};

exports.resetPassword = function (req, res) {
    resettingPassword.setResetPassword(req, res);
};
