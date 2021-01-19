const db = require('../models/index')
const { sequelize } = require('../models/index');

module.exports.removeQuestion = async(req, res) => {
    try {

        var quiz_id = req.session.quizzid.quiz_id;
        var srno = req.query.srno;
        var qid = await db.question.findOne({
            where: {
                "quiz_id": quiz_id,
                "serial_no": srno
            }
        });
        var query = `call delete_question_details("${quiz_id}","${qid.question_id}","${srno})`;


        let procedureCall = await sequelize.query(query).then(v => console.log(v));


        return true;

    } catch (err) {

        console.log(err);
        return false;
    }
}