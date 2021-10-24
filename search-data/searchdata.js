const { Answer, Category, Question, User } = require('../db/models');

const { Op } = require('sequelize');

async function searchQuestions(term) {
  // search for questions with the given term in its title
  const questionsTitle = await Question.findAll({
    where: {
      title: { [Op.iLike]: `%${term}%` },
    },
    limit: 15,
  });
  let questions = new Set(questionsTitle);
  const questionsQuestion = await Question.findAll({
    where: {
      question: { [Op.iLike]: `%${term}%` },
    },
    limit: 15,
  });
  questionsQuestion.forEach((question) => {
    if (!questions.has(question)) {
      questions.add(question);
    }
  });
  return Array.from(questions);
}

module.exports = {
  searchQuestions,
};
