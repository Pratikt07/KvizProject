const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('responses', {
    response_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    participant_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'users',
        key: 'userid'
      }
    },
    quiz_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'quiz',
        key: 'quiz_id'
      }
    },
    option_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'options',
        key: 'option_id'
      }
    },
    question_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'question',
        key: 'question_id'
      }
    },
    response_statement: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    response_time: {
      type: DataTypes.STRING(30),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'responses',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "response_id" },
        ]
      },
      {
        name: "FK_resp_parti",
        using: "BTREE",
        fields: [
          { name: "participant_id" },
        ]
      },
      {
        name: "FK_resp_quiz",
        using: "BTREE",
        fields: [
          { name: "quiz_id" },
        ]
      },
      {
        name: "FK_resp_question",
        using: "BTREE",
        fields: [
          { name: "question_id" },
        ]
      },
      {
        name: "FK_resp_option",
        using: "BTREE",
        fields: [
          { name: "option_id" },
        ]
      },
    ]
  });
};
