//External Imports
const express = require('express');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

//Internal Imports
const { User } = require('../db/models');
const { asyncHandler, csrfProtection } = require('./utils');
const { userValidators } = require('./validators');

const router = express.Router();

router.post(
  '/',
  csrfProtection,
  userValidators,
  asyncHandler(async (req, res) => {
    const { fullName, userName, emailAddress, password } = req.body;
    const user = User.build({ emailAddress, userName, fullName });

    const validatorErrors = validationResult(req);

    const hashedPassword = await bcrypt.hash(password, 12);

    if (validatorErrors.isEmpty()) {
      const hashedPassword = await bcrypt.hash(password, 12);
      user.hashedPassword = hashedPassword;
      await user.save();
      // to-do log in user
      res.redirect('/');
    } else {
      console.log(validatorErrors);
      const errors = validatorErrors.array().map((error) => error.msg);
      res.render('sign-up', {
        user,
        errors,
        csrfToken: req.csrfToken(),
      });
    }
  })
);

module.exports = router;
