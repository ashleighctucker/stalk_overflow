'use strict';

const questions = require('../../questions');
const { User } = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    function createQuestsions(numQuestions, usersEnd, questions, usersStart) {
      let result = [];

      for (let j = usersStart; j < usersEnd; j++) {
        for (let i = 0; i < numQuestions; i++) {
          let currentQuestion = [];
          let questionTitle = [];
          let questionScore;
          Object.values(questions['questionParts']).forEach((value) => {
            const arrLength = value.length;
            const index = Math.floor(Math.random() * arrLength);
            currentQuestion.push(value[index]);
          });
          Object.values(questions['titleOptions']).forEach((value) => {
            const arrLength = value.length;
            const index = Math.floor(Math.random() * arrLength);
            questionTitle.push(value[index]);
          });
          Object.values(questions['questionScores']).forEach((value) => {
            const arrLength = value.length;
            const index = Math.floor(Math.random() * arrLength);
            questionScore = value[index];
          });
          currentQuestion = currentQuestion.join(' ');
          questionTitle = questionTitle.join('');
          result.push({
            question: currentQuestion,
            userId: j,
            title: questionTitle,
            questionScore,
          });
        }
      }
      return result;
    }

    const numUsers = await User.count();
    const numQuestions = 3;
    let usersStart = await User.findOne({ order: ['id'] });
    usersStart = usersStart.id + 1;

    let questionsArray = createQuestsions(
      numQuestions,
      numUsers + usersStart - 1,
      questions,
      usersStart
    );
    return queryInterface.bulkInsert('Questions', questionsArray, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Questions', null, {});
  },
};
