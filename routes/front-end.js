//External Imports
const express = require('express');

//Internal Imports
const { User, Question, Answer } = require('../db/models');
const { asyncHandler, csrfProtection } = require('./utils');

const router = express.Router();

// Front end route for home page
router.get('/', (req, res) => {
  //change index to home
  res.render('index', { title: 'Stalk Overgrow' });
});

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

//to-do add edit a question page, or do we want to try to make this more dynamic with js?

module.exports = router;
