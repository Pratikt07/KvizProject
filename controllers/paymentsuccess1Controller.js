const session_check_controller = require('./session_check_controller.js');

module.exports.success_msg=async(req,res)=>{
   
    if(session_check_controller.check_session(req,res)){
     
        res.render('success_payment.ejs',{session:session_check_controller.check_session(req,res),
                                    username:req.session.user,
                                    
                                     });
    }
    else{
       res.render('login.ejs',{session:session_check_controller.check_session(req,res), flag:true});
   }
}