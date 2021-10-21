"use strict";
const answers = require("../../answers");
const { User } = require("../models");
const { Question } = require("../models");

module.exports = {
  up: async(queryInterface, Sequelize) => {
    function createAnswers(
      numAnswers,
      numQuestions,
      answers,
      usersStart,
      usersEnd
    ) {
      const result = [];
      console.log("Inside");

      for (let i = usersStart; i < usersEnd; i++) {
        let questionsArray = [];
        for (let j = 0; j < numAnswers; j++) {
          let answer = [];
          let answerTitle = [];

          Object.values(answers["answerParts"]).forEach((value) => {
            const arrLength = value.length;
            const index = Math.floor(Math.random() * arrLength);
            answer.push(value[index]);
          });
          Object.values(answers["titleOptions"]).forEach((value) => {
            const arrLength = value.length;
            const index = Math.floor(Math.random() * arrLength);
            answerTitle.push(value[index]);
          });
          answer = answer.join(" ");
          answerTitle = answerTitle.join("");

          let questionId =
            Math.floor(Math.random() * numQuestions) + numQuestions;

          while (questionsArray.includes(questionId))
            questionId =
              Math.floor(Math.random() * numQuestions) + numQuestions;

          questionsArray.push(questionId);
          console.log("Inside")

          result.push({
            answer,
            userId: i,
            title: answerTitle,
          });
        }
      }
      return result;
    }

    const numUsers = await User.count();

    const numQuestions = await Question.count();

    const numAnswers = Math.floor(Math.random());

    let usersStart = await User.findOne({ order: ["id"] });
    usersStart = usersStart.id + 1;

    let answersArray = createAnswers(
      numAnswers,
      numQuestions,
      answers,
      usersStart,
      numUsers + usersStart - 1,
    );

    return queryInterface.bulkInsert("Answers", answersArray, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Answers", null, {});
  },
};
