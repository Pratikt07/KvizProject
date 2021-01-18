const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
 var question_tag = sequelize.define('question_tag', {
    tag_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'tags',
        key: 'tag_id'
      }
    },
    question_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'question',
        key: 'question_id'
      }
    }
  }, {
    sequelize,
    tableName: 'question_tag',
    timestamps: false,
    indexes: [
      {
        name: "FK_question_tag",
        using: "BTREE",
        fields: [
          { name: "question_id" },
        ]
      },
      {
        name: "FK_question_tag2",
        using: "BTREE",
        fields: [
          { name: "tag_id" },
        ]
      },
    ]
  });
  question_tag.removeAttribute('id');
  return question_tag;
};
