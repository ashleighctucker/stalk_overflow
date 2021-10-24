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
      return res.redirect(`/questions/view/${questionId}`);
    } else {
      const errors = validatorErrors.array().map((error) => error.msg);
      return res.render('answer-question', {
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

    const { title, answer, userId, questionId } = req.body;

    const newAnswer = {
      title,
      answer,
      questionId,
      userId,
    };

    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
      await answerToUpdate.update(newAnswer);
      return res.redirect(`/questions/view/${questionId}`);
    } else {
      const errors = validatorErrors.array().map((error) => error.msg);
      return res.render('answer-edit', {
        title: `Edit Answer ${answer.id}`,
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
    return res.redirect('/');
  })
);

module.exports = router;
