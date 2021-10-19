//External Imports
const express = require('express');
const { validationResult } = require('express-validator');

//Internal Imports
const { Answer } = require('../db/models');
const { asyncHandler, csrfProtection } = require('./utils');
const { answerValidators } = require('./validators');

const router = express.Router();

module.exports = router;
