const session_check_controller = require('./session_check_controller.js');
module.exports.getPage=(req,res)=>{
    if(session_check_controller.check_session(req,res)){
        //    console.log("inside checker")
            res.render('joinQuiz.ejs',{session:session_check_controller.check_session(req,res),username:req.session.user});
    }
    else{
        //console.log("outiside checker");
        res.render('login.ejs',{session:session_check_controller.check_session(req,res), flag:true});
    }
}
module.exports.joinquiz=(req,res)=>{
    
}