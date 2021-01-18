//require all modules

require('dotenv').config();
const express = require('express');
const app = express();

var cors = require('cors');
const path = require('path');
var bodyParser = require('body-parser');
var uniqid = require('uniqid');
var session = require('express-session');
const FileStore = require('session-file-store')(session);
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;

//require js file from other folders to use their function

const { deserializeUserCallback } = require('./controllers/deserializeUserController.js');
const { serializeUserCallback } = require('./controllers/serializeUserController.js');
const { LocalStrategyCallback } = require('./controllers/LocalStrategyController.js');
const { GoogleStrategyCallback } = require('./controllers/GoogleStrategyController.js');
const homePageRouter = require('./routes/homePageRoute');
const SignupRouter = require('./routes/signupRoute');
const verifyemailRouter = require('./routes/verifyEmailRoute');
const loginRouter = require('./routes/loginRoute');
const checkPlagRouter = require('./routes/checkPlagairismRoute');
const resetPasswordRouter = require('./routes/resetPasswordRoute');
const doneQuizRouter = require('./routes/doneQuizRoute');
const savingQuizInitialsRouter = require('./routes/savingQuizInitialsRouter');
const paymentRouter = require('./routes/paymentRoute');
const logoutRouter = require('./routes/logoutRoute');
const forgetPasswordRouter = require('./routes/forgetPasswordRoute');
const addQuestionRouter = require('./routes/addQuestionRoute');
const offlineQuizRouter = require('./routes/offlineQuizRoute');
const startQuizRouter = require('./routes/startQuizRoute');
const createQuizRouter = require('./routes/createQuizRoute');
const fetchquizRouter= require('./routes/fetchquizRoute');
const profileRouter = require('./routes/profileRoute');
const premiumRouter = require('./routes/premiumRoute');
const  editprofileRouter  = require('./routes/editprofileRoute.js');
const paymentSuccessRouter = require('./routes/paymentSuccessRoute.js');
const paymentSuccess1Router = require('./routes/paymentSuccess1Route.js')
const joinQuizRouter = require('./routes/joinQuizRoute.js');
const addResponseRouter = require('./routes/addResponseRouter');

/*                                                                              
MIDDLEWARE STACK

*/
app.set('view engine', 'ejs');
app.use(cors());
passport.use(new LocalStrategy({ usernameField: 'email' }, LocalStrategyCallback));

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: `${process.env.SERVER_API_URL}/auth/google/callback`,
        },
        GoogleStrategyCallback
    )
);

app.listen(process.env.PORT || 3000, function () {
    console.log(' server is Running at Port 3000');
});

//set() is used to store the variable name...//
app.set('view engine', 'pug'); //view engine ==pug
app.set('views', path.join(__dirname, 'views')); //view == ___dirname/views

//app.use() is used to push the module in a middleware stack

app.use('', express.static(path.join(__dirname, 'public')));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json

app.use(bodyParser.json());

app.use(
    session({
        genid: function (req) {
            console.log('inside session middleware');
            console.log(req.sessionID);

            console.log('-----------------');
            return uniqid(); // use UUIDs for session IDs
        },

        store: new FileStore(),

        secret: process.env.SECRET_KEY,
        resave: true,
        saveUninitialized: false,
        //  cookie: { secure: true }
    })
);
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(serializeUserCallback);

passport.deserializeUser(deserializeUserCallback);
app.use('/', homePageRouter);
app.use('/api/v1', homePageRouter);
app.use('/api/v1/signup', SignupRouter);
app.use('/api/v1/verify', verifyemailRouter);
app.use('/api/v1/login', loginRouter);
//app.use(`${process.env.BASE_API_URL}/auth/google`);
app.use('/api/v1/forgotpassword', forgetPasswordRouter);
app.use('/api/v1/resetpassword', resetPasswordRouter);
app.use('/api/v1/checkplag', checkPlagRouter);
app.use('/api/v1/upload-multiple-files', startQuizRouter);
app.use('/api/v1/saveQuizdetails', savingQuizInitialsRouter);
app.use('/api/v1/addQuestion', addQuestionRouter);
app.use('/api/v1/offlineQuiz', offlineQuizRouter);
app.use('/api/v1/fetchquiz', fetchquizRouter);
app.use('/api/v1/payment', paymentRouter);
app.use('/api/v1/logout', logoutRouter);
app.use('api/v1/startquiz', startQuizRouter);
app.use('/api/v1/createQuiz', createQuizRouter);
app.use('/api/v1/doneQuiz', doneQuizRouter);
app.use('/api/v1/profile', profileRouter); ///api/v1/premium
app.use('/api/v1/premium', premiumRouter);
app.use("/api/v1/editprofile",editprofileRouter);
app.use("/api/v1/paymentsuccess",paymentSuccessRouter);
app.use("/api/v1/paymentsuccess1",paymentSuccess1Router);
app.use("/api/v1/joinquiz",joinQuizRouter);
app.use('/api/v1/addResponse',addResponseRouter)

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/signup');
    }
}
