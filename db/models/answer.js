"use strict";
module.exports = (sequelize, DataTypes) => {
  const answer = sequelize.define(
    "Answer",
    {
      title: {
        allowNull: false,
        type: DataTypes.STRING(50),
      },
      answer: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      answerScore: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      questionId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    {}
  );
  answer.associate = function (models) {
    // associations can be defined here
  };
  return answer;
};
