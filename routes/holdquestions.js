//External Imports
const express = require('express');
const { validationResult } = require('express-validator');

//Internal Imports
const { Question, Answer } = require('../db/models');
const { asyncHandler, csrfProtection } = require('./utils');
const { questionValidators } = require('./validators');

const router = express.Router();

router.get(
  '/questions',
  asyncHandler(async (req, res) => {
    const questions = await Question.findAll({
      include: Answer,
      order: [['updatedAt', 'DESC']],
      limit: 15,
    });

    res.json({ questions });
  })
);

//move this router to the front end
router.get('/questions/view/:id(\\d+)', async (req, res) => {
  const questionId = parseInt(req.params.id, 10);
  const question = await Question.findOne({
    where: { id: questionId },
    include: Answer,
  });

  res.render('question-view', { title: question.title, question });
});

router.get(
  '/questions/:id(\\d+)',
  asyncHandler(async (req, res) => {
    const questionId = parseInt(req.params.id, 10);
    const question = await Question.findOne({
      where: { id: questionId },
      include: Answer,
    });
    res.json({ question });
  })
);

module.exports = router;
