"use strict";
module.exports = (sequelize, DataTypes) => {
  const comment = sequelize.define(
    "Comment",
    {
      content: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
      answerID: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "Answers",
          key: "id",
        },
      },
      questionId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "Questions",
          key: "id",
        },
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
    },
    {}
  );
  comment.associate = function (models) {
    // associations can be defined here
  };
  return comment;
};
