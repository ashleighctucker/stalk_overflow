//External Imports
const express = require("express");

//Internal Imports
const { Answer, Category, Question, User } = require("../db/models");

// const { csrfProtection, asyncHandler } = require("../utils");

// const Sequelize = require("sequelize");
const { Op } = require("sequelize");
// const router = express.Router();
// ================= SEARCH =========================

async function searchQuestions(term) {
  // search for questions with the given term in its title
  return await Question.findAll({
    where: {
      title: { [Op.like]: term },
      question: { [Op.like]: term },
    }
  });

}

async function getTenNewestQuestions() {
  return await Question.findAll({
    limit: 10,
    order: [["updatedAt", "DESC"]],
  });
}

async function findAnswer(term) {
  return await Answer.findAll({
    where: {
      title: { [Op.like]: term },
      answer: { [Op.like]: term },
    },
  });
}



async function findUser() {
  return await User.findAll({ include: [User] })

}

async function findByCategory(term) {
     return await Category.findAll({ where: { title: { [Op.like]: term } } });
}

// ==================================================

module.exports = {
  UserQuestion,
  searchQuestions,
  getTenNewestQuestions,
  findAnswer,
  findUser,
  findByCategory,
};
