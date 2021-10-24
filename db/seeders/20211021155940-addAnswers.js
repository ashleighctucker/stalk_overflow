'use strict';
const answers = require('../../answers');
const { User } = require('../models');
const { Question } = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    function createAnswers(
      numAnswers,
      numQuestions,
      answers,
      usersStart,
      usersEnd
    ) {
      const result = [];

      for (let i = usersStart; i < usersEnd; i++) {
        let questionsArray = [];
        for (let j = 0; j < numAnswers; j++) {
          let answer = [];
          let answerTitle = [];
          let answerScore;
          Object.values(answers['answerParts']).forEach((value) => {
            const arrLength = value.length;
            const index = Math.floor(Math.random() * arrLength);
            answer.push(value[index]);
          });
          Object.values(answers['titleOptions']).forEach((value) => {
            const arrLength = value.length;
            const index = Math.floor(Math.random() * arrLength);
            answerTitle.push(value[index]);
          });
          Object.values(answers['answerScores']).forEach((value) => {
            const arrLength = value.length;
            const index = Math.floor(Math.random() * arrLength);
            answerScore = value[index];
          });
          answer = answer.join(' ');
          answerTitle = answerTitle.join('');

          let questionCount = numQuestions;

          let questionId = Math.floor(Math.random() * questionCount);
          if (questionId === 0) {
            questionId = 1;
          }

          while (questionsArray.includes(questionId))
            questionId = Math.floor(Math.random() * questionCount);

          questionsArray.push(questionId);

          result.push({
            answer,
            userId: i,
            title: answerTitle,
            questionId,
            answerScore,
          });
        }
      }

      return result;
    }

    const numUsers = await User.count();

    const numQuestions = await Question.count();
    console.log(await Question.count());

    const numAnswers = 3;

    let usersStart = await User.findOne({ order: ['id'] });
    usersStart = usersStart.id + 1;
    let answersArray = createAnswers(
      numAnswers,
      numQuestions,
      answers,
      usersStart,
      numUsers + usersStart - 1
    );

    return queryInterface.bulkInsert('Answers', answersArray, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Answers', null, {});
  },
};
