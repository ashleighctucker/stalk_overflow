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
  comment.associate = function (models) {
    // associations can be defined here
  };
  return comment;
};
