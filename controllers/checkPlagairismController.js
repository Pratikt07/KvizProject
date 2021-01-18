const executerEngine = require('../models1/executerEngine.js');

module.exports.checkplag = function (req, res) {
   // console.log('inside check plag controller');
    executerEngine.runPlagEngine(req, res);
};
