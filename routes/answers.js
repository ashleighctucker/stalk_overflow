//External Imports
const express = require('express');
const { validationResult } = require('express-validator');

//Internal Imports
const { Answer } = require('../db/models');
const { asyncHandler, csrfProtection } = require('./utils');
const { answerValidators } = require('./validators');

const router = express.Router();

//API endpoint for adding an answer to a question
router.post(
  '/',
  csrfProtection,
  answerValidators,
  asyncHandler(async (req, res) => {
    const { title, answer, questionId, userId } = req.body;
    const newAnswer = Answer.build({ title, answer, questionId, userId });

    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
      await newAnswer.save();
      //re routes to specific question page
      res.redirect(`/questions/${questionId}`);
    } else {
      const errors = validatorErrors.array().map((error) => error.msg);
      res.render('answer-question', {
        title: 'Answer',
        answer,
        errors,
        csrfToken: req.csrfToken(),
      });
    }
  })
);

module.exports = router;
