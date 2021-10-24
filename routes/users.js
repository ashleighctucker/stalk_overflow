//External Imports
const express = require('express');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

//Internal Imports
const { User } = require('../db/models');
const { asyncHandler, csrfProtection } = require('./utils');
const { userValidators, loginValidators } = require('./validators');
const { loginUser, logoutUser } = require('../auth');

const router = express.Router();

router.post(
  '/',
  csrfProtection,
  userValidators,
  asyncHandler(async (req, res) => {
    const { fullName, userName, emailAddress, password } = req.body;
    const user = User.build({ emailAddress, userName, fullName });

    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
      const hashedPassword = await bcrypt.hash(password, 12);
      user.hashedPassword = hashedPassword;
      await user.save();
      loginUser(req, res, user);
      return res.redirect('/');
    } else {
      const errors = validatorErrors.array().map((error) => error.msg);
      return res.render('sign-up', {
        title: 'Sign Up',
        user,
        errors,
        csrfToken: req.csrfToken(),
      });
    }
  })
);

router.post(
  '/login',
  csrfProtection,
  loginValidators,
  asyncHandler(async (req, res) => {
    const { userName, password } = req.body;

    let errors = [];
    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
      const user = await User.findOne({ where: { userName } });

      if (user !== null) {
        const passwordMatch = await bcrypt.compare(
          password,
          user.hashedPassword.toString()
        );

        if (passwordMatch) {
          loginUser(req, res, user);
          return res.redirect('/');
        }
      }
      errors.push('Login failed for the provided username and password');
    } else {
      errors = validatorErrors.array().map((error) => error.msg);
    }
    return res.render('login', {
      title: 'Login',
      userName,
      errors,
      csrfToken: req.csrfToken(),
    });
  })
);

router.post('/logout', (req, res) => {
  logoutUser(req, res);
  return res.redirect('/');
});

module.exports = router;
