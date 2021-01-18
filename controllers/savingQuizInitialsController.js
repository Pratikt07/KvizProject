const putFolderName = require('../models1/PutFolderName.js');
const loadFunction = require('../models1/loaderFunction.js');
const session_check_controller = require('./session_check_controller.js');


const db=require('../models/index');
exports.saveResult = async (req, res) => {
    let quizname = req.body.QuizName;
    let quizdesc = req.body.QuizDesc;
    let userid= req.session.userid;
    req.session.catId=req.body.category;
    console.log(userid);
    const quizz = await db.quiz.create({creator_id:userid,
                                created_at:new Date(),
                                tittle:quizname,
                                description:quizdesc,
                            });       
    console.log(quizz);
    req.session.quizzid=quizz;
    
    if(quizz){
        if (session_check_controller.check_session(req, res)) {
            // console.log('inside checker');
           
            
         
             res.render('addQuestion.ejs', {
                 session: session_check_controller.check_session(req, res),
                 username: req.session.user,
               
                
             });
         } else {
           //  console.log('outiside checker');
             res.render('homePage.ejs', {
                 session: session_check_controller.check_session(req, res),
                 username: req.session.user,
             });
         }
    }else{
        res.render('homePage.ejs', {
            session: session_check_controller.check_session(req, res),
            username: req.session.user,
        });
    }
};

