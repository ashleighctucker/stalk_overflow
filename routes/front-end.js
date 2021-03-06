//External Imports
const express = require('express');

//Internal Imports
const { User, Question, Answer } = require('../db/models');
const { asyncHandler, csrfProtection } = require('./utils');

const router = express.Router();

router.get('/splash', (req, res) => {
  return res.render('splash');
});

// Front end route for home page
router.get(
  '/',
  asyncHandler(async (req, res) => {
    if (!req.session.auth) {
      return res.render('splash');
    }
    const questions = await Question.findAll({
      include: Answer,
      order: [['updatedAt', 'DESC']],
      limit: 15,
    });
    return res.render('index', { title: 'Stalk Overgrow', questions });
  })
);

// Front end route for sign up
router.get(
  '/sign-up',
  csrfProtection,
  asyncHandler(async (req, res) => {
    const user = await User.build();
    return res.render('sign-up', {
      title: 'Sign Up',
      user,
      csrfToken: req.csrfToken(),
    });
  })
);

// Front end route for login
router.get(
  '/login',
  csrfProtection,
  asyncHandler(async (req, res) => {
    return res.render('login', {
      title: 'Login',
      csrfToken: req.csrfToken(),
    });
  })
);

// Front end route for asking a new question
router.get('/questions/ask', csrfProtection, async (req, res) => {
  if (!req.session.auth) {
    return res.redirect('/login');
  }
  const question = await Question.build();
  return res.render('questions-ask', {
    title: 'Ask A Question',
    question,
    csrfToken: req.csrfToken(),
  });
});

// Front end route for a specific question
router.get('/questions/view/:id(\\d+)', async (req, res) => {
  const questionId = parseInt(req.params.id, 10);
  const question = await Question.findOne({
    where: { id: questionId },
    include: Answer,
  });

  return res.render('question-view', { title: question.title, question });
});

//Front end route for getting the edit question page
router.get('/questions/:id(\\d+)/edit', csrfProtection, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const question = await Question.findOne({
    where: { id: id },
    include: Answer,
  });
  return res.render('question-edit', {
    title: `Edit Question ${id}`,
    question,
    csrfToken: req.csrfToken(),
  });
});

//Front end route for answering a questions
router.get(
  '/questions/:id(\\d+)/answer',
  csrfProtection,
  asyncHandler(async (req, res) => {
    if (!req.session.auth) {
      return res.redirect('/login');
    }
    const id = parseInt(req.params.id, 10);
    const question = await Question.findOne({
      where: { id: id },
      include: Answer,
    });
    const { userId } = req.session.auth;
    const testAnswer = await Answer.findOne({
      where: { userId, questionId: question.id },
    });
    if (testAnswer) {
      return res.redirect(`/answers/${testAnswer.id}/edit`);
    }
    const answer = Answer.build();
    return res.render('answer-question', {
      title: `${question.title}`,
      question,
      answer,
      csrfToken: req.csrfToken(),
    });
  })
);

router.get('/answers/:id(\\d+)/edit', csrfProtection, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const answer = await Answer.findOne({
    where: { id: id },
    include: Question,
  });
  return res.render('answer-edit', {
    title: `Edit Answer ${id}`,
    question: answer.Question,
    answer,
    csrfToken: req.csrfToken(),
  });
});

module.exports = router;
