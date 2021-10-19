//External Imports
const express = require('express');

//Internal Imports
const { User } = require('../db/models');
const { csrfProtection, asyncHandler } = require('./utils');
const { userValidators } = require('./validators');

const router = express.Router();

router.post(
  '/',
  userValidators,
  asyncHandler(async (req, res) => {
    //creates a user
    const { fullName, userName, emailAddress, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = User.create({
      emailAddress,
      userName,
      fullName,
      hashedPassword,
    });

    // should this be res.redirect?
    res.status(201).json({ user: { id: user.id } });
  })
);

module.exports = router;
