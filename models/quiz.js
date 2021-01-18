const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('quiz', {
    quiz_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    creator_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'users',
        key: 'userid'
      }
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    tittle: {
      type: DataTypes.STRING(70),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    overall_timer: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    quiz_present_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    quiz_thumbnail: {
      type: DataTypes.BLOB,
      allowNull: true
    },
    quiz_pin: {
      type: DataTypes.STRING(250),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'quiz',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "quiz_id" },
        ]
      },
      {
        name: "fk_quiz_creator_idx",
        using: "BTREE",
        fields: [
          { name: "creator_id" },
        ]
      },
    ]
  });
};
