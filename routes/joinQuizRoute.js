var express = require('express')
const joinQuizController = require('../controllers/joinQuizController')

var router = express.Router()

// middleware that is specific to this router
/* router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
}) */
// define the home page route

router.route('/').get(joinQuizController.getPage).post(joinQuizController.joinquiz);

module.exports = router