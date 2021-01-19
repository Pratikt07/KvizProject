//require all modules

require('dotenv').config();
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const port = process.env.PORT || 3000;

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
const fetchquizRouter = require('./routes/fetchquizRoute');
const profileRouter = require('./routes/profileRoute');
const premiumRouter = require('./routes/premiumRoute');

const editprofileRouter = require('./routes/editprofileRoute.js');
const paymentSuccessRouter = require('./routes/paymentSuccessRoute.js');
const paymentSuccess1Router = require('./routes/paymentSuccess1Route.js');
const joinQuizRouter = require('./routes/joinQuizRoute.js');
const addResponseRouter = require('./routes/addResponseRouter');

const { Question, Option, Player, Quiz, Game } = require('./models1/class');
const { getQuizByid } = require('./models1/getquiz');
let games = new Map();


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

//set() is used to store the variable name...//
app.set('view engine', 'pug'); //view engine ==pug
app.set('views', path.join(__dirname, 'views')); //view == ___dirname/views

//app.use() is used to push the module in a middleware stack

app.use('', express.static(path.join(__dirname, 'public')));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json

app.use(bodyParser.json());

let sessionMiddleware = session({
    genid: function (req) {
        console.log('inside session middleware');
        console.log(req.sessionID);

        console.log('-----------------');
        return uniqid(); // use UUIDs for session IDs
    },

    store: new FileStore(),

    secret: process.env.SECRET_KEY,
    resave: true,
    saveUninitialized: true,
    //  cookie: { secure: true }
});
app.use(sessionMiddleware);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(serializeUserCallback);

passport.deserializeUser(deserializeUserCallback);
app.get('/api/v1/sendfile', (req, res) => {
    console.log(req.userid, 'abbbb');
    res.sendFile(path.join(__dirname, '/public', 'index1.html'));
});
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

app.use('/api/v1/editprofile', editprofileRouter);
app.use('/api/v1/paymentsuccess', paymentSuccessRouter);
app.use('/api/v1/paymentsuccess1', paymentSuccess1Router);
app.use('/api/v1/joinquiz', joinQuizRouter);
app.use('/api/v1/addResponse', addResponseRouter);

const io = require('socket.io')(server);

const wrap = (middleware) => (socket, next) => middleware(socket.request, {}, next);

io.use(wrap(sessionMiddleware));
io.use(wrap(passport.initialize()));
io.use(wrap(passport.session()));

io.use((socket, next) => {
    if (socket.request.session.user) {
        console.log('i am there in socket middleware');
        next();
    } else {
        next(new Error('unauthorized'));
    }
});

io.on('connection', (socket) => {
    console.log(`new connection ${socket.id}`);
    socket.on('whoami', (cb) => {
        cb(socket.request.session.user ? socket.request.session.email : '');
    });

    const session = socket.request.session;
    console.log(`saving sid ${socket.id} in session ${session.id}`);
    session.socketId = socket.id;
    session.save();

    socket.on('generatePin', async (quiz_id, callback) => {
        console.log('generating pin');
        let questionList = await getQuizByid(quiz_id);
        gamepin = Math.floor(Math.random() * 100000);

        let game = new Game();
        game.Host_id = socket.request.session.userid;
        game.quiz_id = quiz_id;
        game.game_pin = gamepin;
        game.questions = questionList;
        game.players = new Map();
        games.set(gamepin.toString(), game);
        console.log(games);
        //games.push(game);

        socket.join(gamepin);
        socket.emit('newMessage', 'hii new room is assigned');

        callback({
            gamepin: gamepin,
        });
    });
    socket.on('join', async ({ roompin, username }, callback) => {
        //fetch data from
        console.log('in join socket');
        console.log(games);
        let player = new Player();
        player.player_id = socket.request.session.userid;
        player.player_name = username || socket.request.session.email;
        player.socket_id = socket.id;

        let game = await games.get(roompin.toString());

        if (game === undefined) {
            socket.emit('newMessage', 'invalid game code');
        } else {
            game.players.set(player.socket_id.toString(), player);
        }
        console.log(game);
        socket.join(roompin);
        // Welcome current user

        // Broadcast when a user connects
        socket.broadcast.to(roompin).emit('newMessage', `${player.player_name} has joined the room`);

        // Send users and room info
        let playersInfo = [];
        for (const [key, player] of game.players.entries()) {
            playersInfo.push(player.player_name);
        }
        io.to(roompin).emit('roomUsers', {
            playersCount: game.players.length,
            currentlyJoinedplayer: player.player_name,
            playersInfo: playersInfo,
        });
        socket.request.session.currentgame = roompin;

        socket.request.session.save();
        callback({
            text: 'welcome to open Trivia',
        });
    });
    socket.on('startgame', async (roompin, callback) => {
        //fetch data from
        roompin = roompin.toString();
        if (games.has(roompin)) {
            let game = games.get(roompin);
            console.log(game);
            if (socket.request.session.userid === game.Host_id) {
                let question_index = 0;
                let question = game.questions[question_index];

                /* const question = questions_array.find((question) => {
                    question_index++;
                    if (question.serial_no === 1) return question;
                }); */
                // const question_index = questions_array.findIndex((question) => question.serial_no === 1);

                socket.emit('newMessage', 'Welcome to openTrivia');

                // Broadcast when a user connects
                socket.broadcast.to(roompin).emit('newMessage', `ready to start the game in 5 seconds`);

                // Send users and room info
                await setTimeout(() => {
                    game.running_question_index = question_index;
                    io.to(roompin).emit('roomUsers', {
                        question: question,
                    });
                    emitserverTimer(question.question_timer, roompin);
                }, 5000);

                console.log(game.running_question_index);
                // function to emit timer event

                function emitserverTimer(timer, roompin) {
                    let counter = timer;
                    let clrinterval;

                    clrinterval = setInterval(() => {
                        if (counter == 0) {
                            clearInterval(clrinterval);
                            let leaderBoardArray = game.sortByPlayerMarks();
                            io.to(roompin).emit('doneUser', {
                                leaderBoardArray,
                            });
                            console.log('done with start game');
                        }
                        console.log(counter);
                        io.to(roompin).emit('timer', counter);
                        counter--;
                    }, 1000);
                }

                //io.to(roompin).emit('roomUsers', {});
            } else {
                socket.emit('event', 'you are not to host this game');
            }
        } else {
            socket.emit('event', 'invalid game pin');
        }

        // Welcome current user
    });
    socket.on('response', (response) => {
        if (response.roompin === socket.request.session.currentgame) {
            if (games.has(response.roompin)) {
                let game = games.get(response.gamepin);

                players_array = game.players;
                player = players_array.find((player) => {
                    if (player.player_id === socket.request.session.userid && player.socket_id === socket.id) {
                        return player;
                    } else {
                        return null;
                    }
                });
                if (player) {
                    //let question = game.questions.find((q) => q.question_id === response.question_id);
                    let question = game.questions[game.running_question_index];
                    if (question && question.question_id === response.question_id) {
                        if (question.question_type.toLower() === 'mcq') {
                            mcq = new Mcq(question);
                            let earns_point = mcq.eval(response);
                            player.updatePlayerMarks(earns_point);
                        } else if (question.question_type.toLower() === 'fill') {
                            fill = new Fill(question);
                            let earns_point = fill.eval(response);
                            player.updatePlayerMarks(earns_point);
                        } else if (question.question_type.toLower() === 'poll') {
                            poll = new Poll(question);
                            let earns_point = poll.eval(response);
                            //player.updatePlayerMarks(earns_point);
                        }
                    }
                }
            } else {
                socket.emit('event', 'current game is no logner exist');
            }
        }
    });

    socket.on('disconnect', () => {
        console.log(`user${socket.userId} disconnected`);
    });
});


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/signup');
    }
}

server.listen(port, () => {
    console.log(`application is running at: http://localhost:${port}`);
});
