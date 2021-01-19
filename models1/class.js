class Question {
    constructor(q) {
        this.question_id = q.question_id;
        this.question_statement = q.question_statement;
        this.correct_option = q.correct_option;
        this.serial_no = q.serial_no;
        this.question_timer = q.question_timer;
        this.max_points = q.max_points;
        this.options = q.options;
    }
    eval(response) {}
}
class Option {
    constructor(...args) {
        this.option_id = args[3];
        this.option_statement = args[1];
        this.option_serial = args[2];
        this.option_counter = args[2];
    }
}

class Mcq extends Question {
    constructor({ question_type, ...rest }) {
        super(rest);
        this.question_type = question_type;
    }

    eval(response) {
        if (this.question_id === response.question_id) {
            if (response.option_id === this.correct_option) {
                let player_response_time = this.question_timer - response.timer;
                let Bonus_Point = Math.floor((player_response_time / this.question_timer) * this.max_points);
                return this.max_points + Bonus_Point;
            }
            return 0;
        }
        return 0;
    }
}

class Fill extends Question {
    constructor({ question_type, ...rest }) {
        super(rest);
        this.question_type = question_type;
    }
    eval(response) {
        if (this.question_id === response.question_id) {
            if (
                response.responseStatement.toLowerCase() === this.options[0].option_statement.toLowerCase() ||
                response.responseStatement.toLowerCase() === this.options[1].option_statement.toLowerCase() ||
                response.responseStatement.toLowerCase() === this.options[2].option_statement.toLowerCase()
            ) {
                let player_response_time = this.question_timer - response.timer;
                let Bonus_Point = Math.floor((player_response_time / this.question_timer) * this.max_points);
                return this.max_points + Bonus_Point;
            }
            return 0;
        }
        return 0;
    }
}
class Poll extends Question {
    constructor({ question_type, ...rest }) {
        super(rest);
        this.question_type = question_type;
    }
    eval(response) {
        if (this.question_id === response.question_id) {
            for (let i = 0; i < this.options.length; i++) {
                if (this.options[i].option_id === response.option_id) {
                    options[i].option_counter++;
                    return;
                }
            }
        }
        return false;
    }
}
class Quiz {
    constructor(...args) {
        this.quiz_id = args[0];
        this.quiz_title = args[1];
        this.questions = args[2];
    }
}

class Player {
    constructor(...args) {
        this.player_id = args[0];
        this.player_name = args[1];
        this.socket_id = args[2];
        this.responses = args[3];
        this.totalMarks = args[4];
        this.correct_answers = args[5];
    }

    updatePlayerMarks = (earns_point) => {
        if (earns_point > 0) {
            this.totalMarks += earns_point;
            this.correct_answers++;
        }
    };
}

class Game {
    constructor(...args) {
        this.game_pin = args[5];
        this.players = args[3];
        this.Host_id = args[0];
        this.quiz_id = args[1];
        this.quiz_name = args[2];
        this.questions = args[4];
        this.running_question_index = args[5];
        this.question_count = args[6];
    }

    sortByPlayerMarks() {
        let sorted_Array = [];
        console.log(this.players);
        for (const [key, value] of this.players.entries()) {
            sorted_Array.push(value);
        }
        sorted_Array.sort(function (a, b) {
            return b.totalMarks - a.totalMarks || a.player_name.localeCompare(b.player_name);
        });
        return sorted_Array;
    }
}
response = {
    option_id: '1',
    timer: '2',
    question_id: '3',
    responseStatement: '4',
    roompin: '123',
};

module.exports = {
    Question,
    Option,
    Player,
    Quiz,
    Game,
};
