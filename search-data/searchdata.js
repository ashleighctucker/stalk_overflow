const { Question } = require('../db/models');

const { Op } = require('sequelize');

async function searchQuestions(term) {
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
