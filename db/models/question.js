'use strict';
module.exports = (sequelize, DataTypes) => {
  const question = sequelize.define('question', {
    question: DataTypes.TEXT,
    title: DataTypes.STRING,
    questionScore: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {});
  question.associate = function(models) {
    // associations can be defined here
  };
  return question;
};