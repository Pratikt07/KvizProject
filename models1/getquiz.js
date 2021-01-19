const db = require('../models/index');

exports.getquizes = async (req, res) => {
    console.log('hello');
    let quizes = await db.quiz.findAll({ attributes: { exclude: ['quiz_thumbnail'] } });
    let quizList = [];
    if (quizes) {
        quizes = JSON.parse(JSON.stringify(quizes));
        console.log(quizes);
        for (let i = 0; i < quizes.length; i++) {
            let data = {};
            data['quiz_id'] = quizes[i].quiz_id;
            data['title'] = quizes[i].title;
            data['description'] = quizes[i].description;
            data['overall_timer'] = quizes[i].overall_timer;
            const creator = await db.users.findOne({
                attributes: ['fullname'],
                where: { user_id: quizes[i].creator_id },
            });

            data['fullname'] = creator.fullname;
            quizList[i] = data;
        }
        console.log(quizList);
        res.json({
            status: 'success',
            QuizeList: quizList,
        });
    } else {
        res.json({
            status: 'error',
            message: 'Empty quizes',
        });
    }
};
exports.getQuizByid = async (id) => {
    let questionList = [];

    let questions = await db.question.findAll({ where: { quiz_id: id }, order: [['serial_no', 'ASC']] });
    console.log(questions);
    if (questions === null) {
        console.log('Not found!');
    } else {
        questions = JSON.parse(JSON.stringify(questions));
        console.log(questions);

        for (let i = 0; i < questions.length; i++) {
            let data = {};
            // data['quiz_id'] = questions[i].quiz_id;
            data['question_id'] = questions[i].question_id;
            data['question_type'] = questions[i].question_type;
            data['question_statement'] = questions[i].question_statement;
            data['question_timer'] = questions[i].question_timer;
            data['correct_option'] = questions[i].question_timer;
            data['max_points'] = questions[i].question_timer;
            data['diffculty'] = questions[i].question_timer;
            data['serial_no'] = questions[i].question_timer;
            data['question_image'] = questions[i].question_timer;
            data['options'] = [];
            const options = await db.options.findAll({
                where: { question_id: questions[i].question_id },
            });

            for (let j = 0; j < options.length; j++) {
                //option_idquestion_idoption_statementserial_no
                //option={};
                // option[" option_id"]=options[j]
                data['options'].push(options[i]);
            }
            questionList.push(data);
        }
    }
    return questionList;
};
