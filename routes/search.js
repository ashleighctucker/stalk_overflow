//External Imports
const express = require('express');

//Internal Imports
const { Question } = require('../db/models');
const { asyncHandler } = require('../routes/utils');
const searchRepo = require('../search-data/searchdata');

const router = express.Router();

router.get('/search', async (req, res) => {
  const questions = await Question.findAll({
    order: [['createdAt', 'DESC']],
    limit: 15,
  });
  return res.render('search-result.pug', {
    listTitle: 'Search Results',
    questions: questions,
  });
});

router.post('/search', async (req, res) => {
  const questions = await Question.findAll({
    order: [['createdAt', 'DESC']],
    limit: 15,
  });
  return res.render('search-result.pug', {
    listTitle: 'Search Results',
    questions: questions,
  });
});

router.all(
  '/search/:searchTerm',
  asyncHandler(async (req, res) => {
    const searchData = req.params.searchTerm;

    const questions = await searchRepo.searchQuestions(`%${searchData}%`);

    return res.render('search-result.pug', {
      listTitle: 'Search Results',
      questions,
    });
  })
);

module.exports = router;
