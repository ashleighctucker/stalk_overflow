'use strict';

const answers = require("../../answers");
const { User } = require("../models");

module.exports = {
  up: (queryInterface, Sequelize) => {
    




          result.push({
            answer,
            userId: i,
            title: answerTitle,
            questionId,
          });
        }
      }

      return result;
    }

    const numUsers = await User.count();

    const numQuestions = await Question.count();
    console.log(await Question.count())

    const numAnswers = 3;


    let usersStart = await User.findOne({ order: ["id"] });
    usersStart = usersStart.id + 1;
    let answersArray = createAnswers(
      numAnswers,
      numQuestions,
      answers,
      usersStart,
      numUsers + usersStart - 1
    );


    return queryInterface.bulkInsert("Answers", answersArray, {});


  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkDelete('Answer', null, {});
  }
};
