const loadFunction = require('../models1/loaderFunction.js');
const session_check_controller = require('./session_check_controller.js');
exports.getQuizzpage = async (req, res) => {
    var results = await loadFunction.loader(req, res);

    if (session_check_controller.check_session(req, res)) {
       // console.log('inside checker');
      
       
    
        res.render('createQuiz.ejs', {
            session: session_check_controller.check_session(req, res),
            username: req.session.user,
            results: results,
           
        });
    } else {
      //  console.log('outiside checker');
        res.render('homePage.ejs', {
            session: session_check_controller.check_session(req, res),
            username: req.session.user,
        });
    }
};
exports.createQuiz = async (req, res) => {
    var results = await loadFunction.loader(req, res);
  
    if (session_check_controller.check_session(req, res)) {
       // console.log('inside checker');
      
        res.render('createQuiz.ejs', {
            session: session_check_controller.check_session(req, res),
            username: req.session.user,
            results: results,
           
        });
    } else {
      //  console.log('outiside checker');
        res.render('homePage.ejs', {
            session: session_check_controller.check_session(req, res),
            username: req.session.user,
        });
    }
};
