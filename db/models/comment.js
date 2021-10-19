'use strict';
module.exports = (sequelize, DataTypes) => {
  const comment = sequelize.define('comment', {
    title: DataTypes.STRING,
    answerId: DataTypes.INTEGER,
    questionId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {});
  comment.associate = function(models) {
    // associations can be defined here
  };
  return comment;
};