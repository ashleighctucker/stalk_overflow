//External Imports
const express = require('express');

//Internal Imports
const { Question } = require('../db/models');
const { asyncHandler, csrfProtection } = require('./utils');
const { questionValidators } = require('./validators');

const router = express.Router();

router.post(
  '/',
  questionValidators,
  asyncHandler(async (req, res) => {
    const { question, title, categortyId, userId } = req.body;
    const question = Question.build(question, title, categortyId, userId);

    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
      await question.save();
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

module.exports = router;
