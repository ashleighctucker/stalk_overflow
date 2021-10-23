//External Imports
const express = require('express');

//Internal Imports
const { User, Question, Answer } = require('../db/models');
const { asyncHandler, csrfProtection } = require('./utils');

const router = express.Router();

// Front end route for home page

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const questions = await Question.findAll({
      include: Answer,
      order: [['updatedAt', 'DESC']],
      limit: 15,
    });
    res.render('index', { title: 'Stalk Overgrow', questions });
  })
);

// Front end route for sign up
router.get(
  '/sign-up',
  csrfProtection,
  asyncHandler(async (req, res) => {
    const user = await User.build();
    res.render('sign-up', {
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
    res.render('login', {
      title: 'Login',
      csrfToken: req.csrfToken(),
    });
  })
);

// Front end route for asking a new question
router.get('/questions/ask', csrfProtection, async (req, res) => {
  if (!req.session.auth) {
    res.redirect('/login');
  }
  const question = await Question.build();
  res.render('questions-ask', {
    title: 'Ask A Question',
    question,
    csrfToken: req.csrfToken(),
  });
});

// Front end route for a specific question

//Front end route for getting the edit question page
router.get('/questions/:id(\\d+)/edit', csrfProtection, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const question = await Question.findOne({
    where: { id: id },
    include: Answer,
  });
  res.render('question-edit', {
    title: `Edit Question ${id}`,
    question,
    csrfToken: req.csrfToken(),
  });
});

module.exports = router;
