'use strict';
module.exports = (sequelize, DataTypes) => {
  const answer = sequelize.define('answer', {
    title: DataTypes.STRING,
    answer: DataTypes.TEXT,
    answerScore: DataTypes.INTEGER,
    questionId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {});
  answer.associate = function(models) {
    // associations can be defined here
  };
  return answer;
};