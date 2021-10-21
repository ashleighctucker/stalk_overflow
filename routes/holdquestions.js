//External Imports
const express = require('express');
const { validationResult } = require('express-validator');

//Internal Imports
const { Question } = require('../db/models');
const { asyncHandler, csrfProtection } = require('./utils');
const { questionValidators } = require('./validators');

const router = express.Router();

module.exports = router;
