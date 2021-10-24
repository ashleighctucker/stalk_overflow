//External Imports
const express = require('express');
const { validationResult } = require('express-validator');

//Internal Imports
const { Answer, Question } = require('../db/models');
const { asyncHandler, csrfProtection } = require('./utils');
const { answerValidators } = require('./validators');

const router = express.Router();

//API endpoint for adding an answer to a question
router.post(
  '/questions/:id(\\d+)/answers',
  csrfProtection,
  answerValidators,
  asyncHandler(async (req, res) => {
    const { title, answer } = req.body;
    const questionId = parseInt(req.params.id, 10);
    const { userId } = req.session.auth;
    const newAnswer = Answer.build({ title, answer, questionId, userId });

    const validatorErrors = validationResult(req);
    const question = await Question.findByPk(questionId);
    if (validatorErrors.isEmpty()) {
      await newAnswer.save();
      res.redirect(`/questions/view/${questionId}`);
    } else {
      const errors = validatorErrors.array().map((error) => error.msg);
      res.render('answer-question', {
        title: 'Answer',
        question,
        answer: newAnswer,
        errors,
        csrfToken: req.csrfToken(),
      });
    }
  })
);

//API endpoint for editing an answer to a question
router.post(
  '/answers/edit/:id(\\d+)',
  answerValidators,
  asyncHandler(async (req, res) => {
    const answerId = parseInt(req.params.id, 10);
    const answerToUpdate = await Answer.findByPk(answerId);

    const { title, answer, questionId, userId } = req.body;

    const newAnswer = {
      title,
      answer,
      questionId,
      userId,
    };

    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
      await answerToUpdate.update(newAnswer);
      //re routes to specific question page - un-comment and replace once we have that page done
      // res.redirect(`/questions/${questionId}`);
      res.redirect(`/`);
    } else {
      const errors = validatorErrors.array().map((error) => error.msg);
      res.render('answer-edit', {
        title: 'Edit Answer',
        answer,
        errors,
        csrfToken: req.csrfToken(),
      });
    }
  })
);

//API endpoint for deleting an answer to a question
router.post(
  '/answers/delete/:id(\\d+)',
  asyncHandler(async (req, res) => {
    const answerId = parseInt(req.params.id, 10);
    const answer = await Answer.findByPk(answerId);
    await answer.destroy();
    res.redirect('/');
  })
);

module.exports = router;
