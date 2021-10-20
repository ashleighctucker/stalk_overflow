'use strict';
module.exports = (sequelize, DataTypes) => {
  const Answer = sequelize.define(
    'Answer',
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
  Answer.associate = function (models) {
    Answer.belongsTo(models.User, { foreignKey: 'userId' });
    Answer.belongsTo(models.Question, { foreignKey: 'questionId' });
    Answer.hasMany(models.Comment, { foreignKey: 'answerId' });
  };
  return Answer;
};
