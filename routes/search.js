//External Imports
const express = require("express");

//Internal Imports
const { Answer, Category, Question, User } = require("../db/models");

// const { csrfProtection, asyncHandler } = require("../utils");

const Sequelize = require("sequelize");
const { Op } = require("sequelize");
const router = express.Router();
// ================= SEARCH =========================

const {
  searchQuestions,
  findAnswer,
} = require('../search-data/searchdata');
//TODO - take out any that you are not using


let searchRepo;
let loadingModuleError;
try {
  searchRepo = require("../search-data/searchdata");
} catch (e) {
  console.error(e);
  loadingModuleError = `An error was raised "${e.message}". Check the console for details.`;
}


router.get("/search", async (req, res) => {
  let error = loadingModuleError;
  let questions;
  let answers;
  try {
    questions = await searchRepo.searchQuestions(`%${req.query.term}%`);
    answers = await searchRepo.findAnswer(`%${req.query.term}%`);
  } catch (e) {
    console.error(e);
    error = `An error ocurred that reads "${e.message}". Check the console for more details.`;
  }
  res.render("search-result.pug", {
    listTitle: "Search Results",
    error,
    questions,
    answers,
  });
});

module.exports = router;
