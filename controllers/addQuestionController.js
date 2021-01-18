var mysql = require('mysql');
var Config = require('../config');
const fs = require('fs');
var Promise = require("bluebird");

const db=require('../models/index');


    module.exports.addquestion = async (req,res) => {
        try{
            var question_statement = req.body.question_statement;
            var quiz_id = req.session.quizzid.quiz_id;
            // if(isQuestionExist(question_statement,quiz_id)){
            //     res.json({status:"failed", msg:"question already exist"})
            // }
            console.log( req.body);
           console.log(req.body.correct_serial);
           
            let optionsCheck = {};
        var cat_name = req.session.catId;
        var tags = "";
        var optionsList = "";
       if(req.body.correct_serial==""){
           correct_serial=0;
       }
       
        var question_type = req.body.question_type;
        var serial_no = req.body.serial_no;
        var difficulty = req.body.difficulty;
        var question_timer = req.body.question_timer;
        var max_points = req.body.max_points;
        var option_state = req.body.options;
        var correct_serial = req.body.correct_serial;
        let question_Image_Buffer;
        var tagList = req.body.tags;
        
      
        // for(var i=0;i<tagList.length;i++){
        //     console.log("true or false tags = "+tagsCheck[tagList[i]]);
        //     if(tagsCheck[tagList[i]]){
        //         continue;
        //     }else{
        //         if(i==tagList.length-1){
        //             tags +=  "( '"+ tagList[i]+"' )";
        //         }else{
        //             tags +=  "( '"+ tagList[i]+"' ),";
        //         }
        //     }      
        // }
    
        
    
        // await isOptionsPresent(option_state);
        for(var i=0;i < option_state.length;i++){
            if(optionsCheck[option_state[i].stmt]){
                continue;
            }else{
                if(i==option_state.length-1){
                    optionsList +=  "( q_id ,'"+ option_state[i].statement+"',"+ option_state[i].serial_no+" )";
                }else{
                    optionsList +=  "( q_id ,'"+ option_state[i].statement+"',"+ option_state[i].serial_no+" ),";
                }
            }
            
        }
    
        console.log(optionsList);
       
        if(req.file==undefined){
            question_Image_Buffer = null;
          
          }       
         else {
             console.log(req.file.path);
             question_Image_Buffer = fs.readFileSync(req.file.path);
              console.log( "obj not exist  = "+obj);
              
       }
    
       
    //    if(tags === ""){
    //        console.log("empty tags");
    //     tags = "";
    //    }
    //    if(optionsList === ""){
    //     optionsList = "";
    //    }
    
       console.log("adding.....................")
        var query = `call insert_question_details (:catName,:quiz_id,:question_type,:question_statement,:serial_no,:difficulty,:question_timer,:correct_option,:max_points,:question_image,"${optionsList}",:correct_serial )`
        
        let procedureCall =   await db.sequelize.query(query, {
            
            replacements: {
                catName: cat_name,
                quiz_id: quiz_id ,
                question_type: question_type,
                question_statement:question_statement,
                serial_no: serial_no,
                difficulty:difficulty,
                question_timer: question_timer,
                correct_option:"xyz",
                max_points: max_points,
                question_image: question_Image_Buffer,
                correct_serial: correct_serial
            
               
            }
        }).then(v=>{console.log("successfull",v)
                res.json({msg:"successful",status:true});
            }).catch(e=>{
                console.log(e)
                res.send({msg:"unsuccessful",status:false})
            });
        
        
        // mergeQuestionTags(req.body.tags,Q.question_id);
        // tagsCheck = {};
        // return true;  
        }
        catch(err) {
            console.log("===========================error===================================");
            console.error(err);
            res.send({status:"unsuccessful"})
            return 0;
        }
    }
    
    
    
    
    async function isTagsPresent(tagList,Qid){
        try{
            for(let i=0;i<tagList.length;i++){
                console.log(tagList[i]);
            const tag = await db.tags.findOne({
               
                where: { tag_name:tagList[i]}
            });
            
            console.log("created "+tag.tag_name);
            if(tag === null){
                tagsCheck[tagList[i]] = false;
            }else{
                tagsCheck[tagList[i]] = true;
            }
           
        }
        console.log(tagsCheck);
            return ;
    
        }
        catch(err){
            console.log(err);
           
        }
    }
    
    async function isQuestionExist(statement,quizId){
        try {
            let data = await db.question.findOne({
                where: {
                    quiz_id : quizId,
                    question_statement : statement
    
                },
            });
            console.log("question exist = "+data);
            if (data == null) return false;
            else return true;
        } catch {
            (err) => {
               console.error(err);
            };
        }
    }
    
    async function mergeQuestionTags(tags,Qid){
        try{
            console.log("tags[0] = "+tags[0]);
            for(let i=0;i<tags.length;i++){
                console.log(tags[i]);
            const t = await db.tags.findOne({
               
                where: { tag_name:tags[i]}
            })
            console.log("tag id = "+t.tag_id);
            console.log("tag name = "+t.tag_iname);
            
            db.question_tag.findOrCreate({
                  where: { 
                    tag_id:t.tag_id,
                    question_id : Qid
                    } 
            });
        }
            return ;
    
        }
        catch(err){
            console.log(err);
            
        }
    }
module.exports.check_status=  function (req,res) {
    //console.log('inside  check status')
    const Connection = mysql.createConnection(config);
    var email = req.session.user;
    var folderName = req.body.foldername;
   // console.log(folderName,email)
    var data = [email,'pending'];
    Connection.connect();
    Connection.query(
		'select count(*) as count from ComparisonHistory where email = ? and status =  ?',
		data,
		(err, results) => {
           
			if (err) {
				console.log(err);
				reject(err);
			}
			
            else{
                //console.log(results);
                res.json(results);
            }
            Connection.end();
		});
    

}