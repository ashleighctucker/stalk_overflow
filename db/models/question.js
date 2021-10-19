"use strict";
module.exports = (sequelize, DataTypes) => {
  const question = sequelize.define(
    "Question",
    {
      question: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      title: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      questionScore: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      categoryId: {
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
  question.associate = function (models) {
    // associations can be defined here
  };
  return question;
};
