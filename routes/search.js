//External Imports
const express = require('express');

//Internal Imports
const { Answer, Category, Question, User } = require('../db/models');
const { csrfProtection, asyncHandler } = require('../routes/utils');

const router = express.Router();

const searchRepo = require('../search-data/searchdata');

router.get('/search', async (req, res) => {
  res.render('search-result.pug', {
    listTitle: 'Search Results',
    //   error,
    questions: [],
    //   answers,
  });
});

router.post('/search', async (req, res) => {
  res.render('search-result.pug', {
    listTitle: 'Search Results',
    //   error,
    questions: [],
    //   answers,
  });
});

router.all(
  '/search/:searchTerm',
  asyncHandler(async (req, res) => {
    const searchData = req.params.searchTerm;

    const questions = await searchRepo.searchQuestions(`%${searchData}%`);

    res.render('search-result.pug', {
      listTitle: 'Search Results',
      questions,
    });
  })
);

module.exports = router;
