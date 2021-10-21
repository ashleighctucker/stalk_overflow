//External Imports
const express = require('express');
const { validationResult } = require('express-validator');

//Internal Imports
const { Question } = require('../db/models');
const { asyncHandler, csrfProtection } = require('./utils');
const { questionValidators } = require('./validators');


const router = express.Router();

// ================================================
// moved to search.js
// let searchRepo;
// let loadingModuleError;
// try {
//   searchRepo = require("./search");
// } catch (e) {
//   console.error(e);
//   loadingModuleError = `An error was raised "${e.message}". Check the console for details.`;
// }

// ================================================


//API endpoint for posting/adding a new question
router.post(
  '/',
  questionValidators,
  asyncHandler(async (req, res) => {
    const { question, title, categoryId, userId } = req.body;
    const newQuestion = Question.build({
      question,
      title,
      categoryId,
      userId,
    });

    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
      await newQuestion.save();
      //todo: add redirect to specific question page
      res.redirect('/');
    } else {
      const errors = validatorErrors.array().map((error) => error.msg);
      res.render('questions-ask', {
        title: 'Ask a Question',
        question,
        errors,
        csrfToken: req.csrfToken(),
      });
    }
  })
);

//API endpoint for editing a question
router.post(
  '/edit/:id(\\d+)',
  questionValidators,
  asyncHandler(async (req, res) => {
    const questionId = parseInt(req.params.id, 10);
    const questionToUpdate = await Question.findByPk(questionId);

    const { question, title, categoryId, userId } = req.body;

    const newQuestion = {
      question,
      title,
      categoryId,
      userId,
    };

    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
      await questionToUpdate.update(newQuestion);
      // res.redirect(`/questions/${questionId}`);
      res.redirect(`/`);
    } else {
      const errors = validatorErrors.array().map((error) => error.msg);
      res.render('question-edit', {
        title: 'Edit Question',
        question,
        errors,
        csrfToken: req.csrfToken(),
      });
    }
  })
);

//API endpoint for deleting a question
router.post(
  '/delete/:id(\\d+)',
  asyncHandler(async (req, res) => {
    const questionId = parseInt(req.params.id, 10);
    const question = await Question.findByPk(questionId);
    await question.destroy();
    res.redirect('/');
  })
);


// ================= SEARCH =========================
// moved to search.js

// router.get('/search', async (req, res) => {
//   let error = loadingModuleError;
//   let questions;
//   let answers;
//   try {
//     questions = await searchRepo.searchQuestions(`%${req.query.term}%`);
//     answers = await searchRepo.findAnswer(`%${req.query.term}%`);
//   } catch (e) {
//     console.error(e);
//     error = `An error ocurred that reads "${e.message}". Check the console for more details.`;
//   }
//   res.render("search-result.pug", {
//     listTitle: "Search Results",
//     error,
//     questions,
//     answers,
//   });
// });

// ==================================================


module.exports = router;
