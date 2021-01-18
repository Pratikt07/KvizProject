var DataTypes = require("sequelize").DataTypes;
var _categories = require("./categories");
var _options = require("./options");
var _question = require("./question");
var _question_tag = require("./question_tag");
var _quiz = require("./quiz");
var _responses = require("./responses");
var _tags = require("./tags");
var _users = require("./users");

function initModels(sequelize) {
  var categories = _categories(sequelize, DataTypes);
  var options = _options(sequelize, DataTypes);
  var question = _question(sequelize, DataTypes);
  var question_tag = _question_tag(sequelize, DataTypes);
  var quiz = _quiz(sequelize, DataTypes);
  var responses = _responses(sequelize, DataTypes);
  var tags = _tags(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  options.belongsTo(question, { foreignKey: "question_id"});
  question.hasMany(options, { foreignKey: "question_id"});
  question.belongsTo(categories, { foreignKey: "Cat_id"});
  categories.hasMany(question, { foreignKey: "Cat_id"});
  question.belongsTo(quiz, { foreignKey: "quiz_id"});
  quiz.hasMany(question, { foreignKey: "quiz_id"});
  question_tag.belongsTo(question, { foreignKey: "question_id"});
  question.hasMany(question_tag, { foreignKey: "question_id"});
  question_tag.belongsTo(tags, { foreignKey: "tag_id"});
  tags.hasMany(question_tag, { foreignKey: "tag_id"});
  quiz.belongsTo(users, { foreignKey: "creator_id"});
  users.hasMany(quiz, { foreignKey: "creator_id"});
  responses.belongsTo(options, { foreignKey: "option_id"});
  options.hasMany(responses, { foreignKey: "option_id"});
  responses.belongsTo(users, { foreignKey: "participant_id"});
  users.hasMany(responses, { foreignKey: "participant_id"});
  responses.belongsTo(question, { foreignKey: "question_id"});
  question.hasMany(responses, { foreignKey: "question_id"});
  responses.belongsTo(quiz, { foreignKey: "quiz_id"});
  quiz.hasMany(responses, { foreignKey: "quiz_id"});

  return {
    categories,
    options,
    question,
    question_tag,
    quiz,
    responses,
    tags,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
