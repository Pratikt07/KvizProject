var mysql = require('mysql');
var Config = require('../config');
const fs = require('fs');
var Promise = require("bluebird");
var session_check_controller = require('./session_check_controller');


module.exports.getQuiz_page= async function (req,res) {
    try {
        console.log("hello brother");
        var question_array = req.session.questions;
        var  quiz_id = req.query.quiz_id;
        if(session_check_controller.check_session(req,res)){
            // console.log("inside checker")
              res.render('startQuiz.ejs',{session:session_check_controller.check_session(req,res),
                                          username:req.session.userid,
                                          quiz_id :quiz_id,
                                          
                                           });
       }
          else{
          //console.log("outiside checker");
          res.render('login.ejs',{session:session_check_controller.check_session(req,res), flag:true});
      }
        

    } catch (error) {
        console.log(error);
    }
    
}