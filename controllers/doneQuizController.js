const tempDirectory = require('../models1/tempDirectory.js');
const userDirectory = require('../models1/userDirectory.js');
const session_check_controller = require('./session_check_controller.js');

const db = require('../models/index');

module.exports.completeQuiz = function (req, res) {
    try {
        console.log("hello brother");
       
        
        if(session_check_controller.check_session(req,res)){
            // console.log("inside checker")
              res.render('doneQuiz.ejs',{session:session_check_controller.check_session(req,res),
                                          username:req.session.user
                                           });
       }
          else{
          //console.log("outiside checker");
          res.render('login.ejs',{session:session_check_controller.check_session(req,res), flag:true});
      }
        

    } catch (error) {
        console.log(error);
    }
};
module.exports.completed = function (req, res) {

    var update_timer = req.body.overall_timer; 
    var present_date = req.body.present_date;
    var quiz_id = req.session.quizzid.quiz_id;
    var pin = quiz_id+"-"+req.session.quizzid.creator_id;
    var results ={pin : pin,tittle:req.session.quizzid.tittle};

    db.quiz.update(
        { overall_timer: update_timer,quiz_present_date:present_date,quiz_pin:pin },
        { where: { quiz_id: quiz_id } }
      ).then(result=>{}
        ).catch(err =>{
            console.log(err);
            res.render('homePage.ejs', {
              session: session_check_controller.check_session(req, res),
              username: req.session.user,
        });
    });
    if(session_check_controller.check_session(req, res)) {
       // console.log('inside checker');
        res.render('success.ejs', {
            session: session_check_controller.check_session(req, res),
            username: req.session.user,
            results:results
        });
    } else {
        //console.log('outiside checker');
        res.render('homePage.ejs', {
            session: session_check_controller.check_session(req, res),
            username: req.session.user,
        });
    }
}


