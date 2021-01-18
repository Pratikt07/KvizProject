
const session_check_controller = require('./session_check_controller.js');

const db = require('../models/index');

module.exports.getprofile=async (req, res)=>{
    let profile = await db.users.findOne({where: { userid : req.session.userid}});
    if(profile){
        profile  = JSON.parse(JSON.stringify(profile));
    }
    let quizes =   await db.quiz.findAll({attributes: { exclude: ['quiz_thumbnail'],where:{creator_id:req.session.userid} }});
    if(quizes){
        quizes  = JSON.parse(JSON.stringify(quizes));
    }
    console.log("profile",profile);
    //console.log(quizes);
    if(session_check_controller.check_session(req,res)){
     
         res.render('profile.ejs',{session:session_check_controller.check_session(req,res),
                                     username:req.session.user,
                                     profile:profile,
                                     quizes:quizes
                                      });
     }
     else{
        res.render('login.ejs',{session:session_check_controller.check_session(req,res), flag:true});
    }
}
module.exports.editprofile=async(req, res)=>{

}