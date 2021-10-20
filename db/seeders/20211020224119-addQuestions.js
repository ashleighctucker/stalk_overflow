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
          Object.values(questions['questionParts']).forEach((value) => {
            const arrLength = value.length;
            const index = Math.floor(Math.random() * arrLength);
            currentQuestion.push(value[index]);
          });
          currentQuestion = currentQuestion.join(' ');
          result.push({
            currentQuestion,
            userId: j,
          });
        }
      }
      return result;
    }

    const numUsers = await User.count();
    const numQuestions = 4;
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
