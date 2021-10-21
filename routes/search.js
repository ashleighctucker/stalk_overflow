//External Imports
const express = require("express");

//Internal Imports
const { Answer, Category, Question, User } = require("../db/models");

const { csrfProtection, asyncHandler } = require("../utils");

const Sequelize = require("sequelize");
const { Op } = require("sequelize");
const router = express.Router();
// ================= SEARCH =========================

async function searchQuestions(term) {
  // search for questions with the given term in its title
  return await Question.findAll({
    where: {
      title: { [Op.like]: term },
      answer: { [Op.like]: term },
    },
  });
  gi;
}

async function getTenNewestRecipes() {
  return await Recipe.findAll({
    limit: 10,
    order: [["updatedAt", "DESC"]],
  });
}

async function findAnswer(term) {
  return await Question.findAll({
    where: {
      title: { [Op.like]: term },
      answer: { [Op.like]: term },
    },
  });
}

async function findQuestion() {
  return await Question.findAll({ include: [User] }).then((question) => {
    console.log(JSON.stringify(question));
  });
}

async function findUser() {
  return await Question.findAll({ include: [User] }).then((question) => {
    console.log(JSON.stringify(question));
  });
}

async function findByCategory(id) {}

// ==================================================

module.exports = {
  UserQuestion,
  searchQuestions,
};
