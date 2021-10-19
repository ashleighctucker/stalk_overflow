//External Imports
const express = require("express");

//Internal Imports
const { User } = require("../db/models");
const { asyncHandler, csrfProtection } = require("./utils");
const { userValidators } = require("./validators");

const router = express.Router();

router.get(
  "/sign-up",
  csrfProtection,
  asyncHandler(async (req, res) => {
    const user = await User.build();
    res.render("sign-up", {
      user,
      csrfToken: req.csrfToken(),
    });
  })
);

router.get(
  "/login",
  csrfProtection,
  asyncHandler(async (req, res) => {
    res.render("login", {
      csrfToken: req.csrfToken(),
    });
  })
);

module.exports = router;
