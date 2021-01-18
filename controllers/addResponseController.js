var mysql = require('mysql');
var Config = require('../config');
const fs = require('fs');
var Promise = require("bluebird");
const rootPath = require('../rootPath')
const exportResponseToExcel = require('../models1/exportService');

const db=require('../models/index');

module.exports.addResponse = async (req, res) => {
    try{

        let results = [];
        let participant;
        let question_resp = req.body.question_resp;
        
        //console.log("req.body in addresponse = "+req.body);
        // console.log("question_response = "+JSON.parse(question_resp));
        //question_resp = question_resp;
        //console.log("question_repspose = "+question_resp);
        //console.log("lentgh of response = "+JSON.parse(JSON.stringify(question_resp)).length);
        // let participant_id = ;
        //     let quiz_id=;
        const workSheetColumnName = [
            "question_id",
            "Question_statement",
            "option_state1",
            "option_state2",
            "option_state3",
            "option_state4",
            "response",
            "correct Answer",
            "CorrectOrIncorrect",
            
        ]
        
        for(let i=0;i<(JSON.parse(JSON.stringify(question_resp)).length);i++){
           
            let result = {};
            //console.log(JSON.parse(question_resp[i]));
            let stmnt = JSON.parse(question_resp[i]).response_answer_statement;
            //console.log(" response statement = "+JSON.parse(JSON.stringify(question_resp[i])));
            if(stmnt){

            }else{
                stmnt = null;
            }
        var query = `INSERT INTO responses ( participant_id, quiz_id, option_id, question_id, response_statement,  is_correct) VALUES (${req.body.participant_id},
            ${req.body.quiz_id} ,
            ${JSON.parse(question_resp[i]).response_answer_id} ,
            ${JSON.parse(question_resp[i]).question_id},
            "${stmnt}",
            ${JSON.parse(question_resp[i]).isCorrect})`;
        
        
        let saveResponse =   await db.sequelize.query(query);
        //console.log(saveResponse);
       
         participant = await db.users.findOne({  // for participant name
            where : {userid :req.body.participant_id }
        })
        //console.log(JSON.stringify(participant));

        var correct_statement;
        let resp_stmt;
        //console.log(`error = ${JSON.parse(question_resp[i]).question_id}`);

        let options = await db.options.findAll({
            where :{ question_id : JSON.parse(question_resp[i]).question_id}
        }) ;

        //console.log(JSON.stringify(options));

        if(JSON.parse(question_resp[i]).correct_statement){
            resp_stmt = JSON.parse(question_resp[i]).response_answer_statement;
            correct_statement = JSON.parse(question_resp[i]).correct_statement;
        }
        else{
           let  c = await db.options.findOne({
                attribute: ['option_statement'],
                where : {option_id : JSON.parse(question_resp[i]).correct_id}
            })
            let resp = await db.options.findOne({
                attribute: ["option_statement"],
                where : {option_id :  JSON.parse(question_resp[i]).response_answer_id }
            })
            correct_statement = c.option_statement;
            resp_stmt = resp.option_statement;
        }
        
        //question_no	question_statement	option1	option2	optoin3	option4	your response	Correct_answer	correctOrNot	Marks
            result.question_id = JSON.parse(question_resp[i]).question_id;
            result.Question_statement = correct_statement;
            if(stmnt){
                result.option_state1 = options[0].option_statement ;
                result.option_state2 = "";
                result.option_state3 = "" ;
                result.option_state4 = "" ;
            }
            else{
                result.option_state1 = options[0].option_statement ;
                result.option_state2 = options[1].option_statement ;
                result.option_state3 = options[2].option_statement ;
                result.option_state4 = options[3].option_statement ;
            }
           
            result.response = resp_stmt;
            result.correct_Answer = correct_statement;
            result.CorrectOrIncorrect = JSON.parse(question_resp[i]).isCorrect;
            results.push(result);
            
      
        }
        const filePath = rootPath +`/public/responses_offline/${Date.now()}-${participant.fullname}.xlsx`
        fs.appendFile(filePath, '', function (err) {
            if (err) throw err;
           // console.log('Saved!');
          });

        const workSheetName = "Response of "+req.body.quiz_id+" quiz";
       

      await exportResponseToExcel(results, workSheetColumnName, workSheetName, filePath);
   
      res.json({
        status:"successful",
        data : 1
});
    }catch(err){
        console.log(err);
        res.json({
            status:"unsuccessful",
            data : 0
        })
    }
}