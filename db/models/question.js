'use strict';
module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define(
    'Question',
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
        type: DataTypes.INTEGER,
      },
      categoryId: {
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
    Question.belongsTo(models.User, { foreignKey: 'userId' });
    Question.hasMany(models.Answer, {
      foreignKey: 'questionId',
      onDelete: 'cascade',
      hooks: true,
    });
    Question.hasMany(models.Comment, {
      foreignKey: 'questionId',
      onDelete: 'cascade',
      hooks: true,
    });
    Question.hasMany(models.Vote, {
      foreignKey: 'questionId',
      onDelete: 'cascade',
      hooks: true,
    });
  };
  return Question;
};
