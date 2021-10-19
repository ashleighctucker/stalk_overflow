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
        references: {
          model: "Category",
          key: "id",
        },
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "User",
          key: "id",
        },
      },
    },
    {}
  );
  question.associate = function (models) {
    // associations can be defined here
  };
  return question;
};
