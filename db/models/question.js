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
  Question.associate = function (models) {
    Question.belongsTo(models.User, {foreignKey: 'id'})
    Question.hasMany(models.Answer, { foreignKey: "questionId" });
    Question.hasMany(models.Comment, { foreignKey: "questionId" });

  };
  return question;
};
