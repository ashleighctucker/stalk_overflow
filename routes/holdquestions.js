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

module.exports = router;
