exports.getquestions = async(req, res) => {
    var questions = await loadFunction.questionLoader(req, res);

    if (session_check_controller.check_session(req, res)) {
        // console.log('inside checker');

        res.render('createQuiz.ejs', {
            session: session_check_controller.check_session(req, res),
            username: req.session.user,
            results: questions,

        });
    } else {
        //  console.log('outiside checker');
        res.render('homePage.ejs', {
            session: session_check_controller.check_session(req, res),
            username: req.session.user,
        });
    }
};