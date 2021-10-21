//External Imports
const express = require('express');
const { validationResult } = require('express-validator');

//Internal Imports
const { Question } = require('../db/models');
const { asyncHandler, csrfProtection } = require('./utils');
const { questionValidators } = require('./validators');

const router = express.Router();

//API endpoint for posting/adding a new question
router.post(
  '/',
  questionValidators,
  asyncHandler(async (req, res) => {
    const { question, title, categortyId, userId } = req.body;
    const newQuestion = Question.build({
      question,
      title,
      categortyId,
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

    const { question, title, categortyId, userId } = req.body;

    const newQuestion = {
      question,
      title,
      categortyId,
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
// move to search.js
// async function searchRecipes(term) {
//   // Use the findAll method of the Question object to search for questions with the
//   // given term in its title
//   //
//   // Docs: https://sequelize.org/v5/manual/querying.html
//   return await Question.findAll({ where: { title: { [Op.like]: term } } });
// }

// ==================================================


module.exports = router;
