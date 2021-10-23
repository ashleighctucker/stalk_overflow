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
    {
      indexes: [
        {
          unique: true,
          fields: ['questionId', 'userId'],
        },
      ],
    }
  );
  Answer.associate = function (models) {
    Answer.belongsTo(models.User, { foreignKey: 'userId' });
    Answer.belongsTo(models.Question, { foreignKey: 'questionId' });
    Answer.hasMany(models.Comment, { foreignKey: 'answerId' });
    Answer.hasMany(models.Vote, { foreignKey: 'answerId' });
  };
  return Answer;
};
