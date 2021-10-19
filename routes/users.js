//External Imports
const express = require("express");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

//Internal Imports
const { User } = require("../db/models");
const { asyncHandler, csrfProtection } = require("./utils");
const { userValidators, loginValidators } = require("./validators");
const { loginUser, logoutUser } = require("../auth");

const router = express.Router();

router.post(
  "/",
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
      loginUser(req, res, user);
      res.redirect("/");
    } else {
      console.log(validatorErrors);
      const errors = validatorErrors.array().map((error) => error.msg);
      res.render("sign-up", {
        user,
        errors,
        csrfToken: req.csrfToken(),
      });
    }
  })
);

router.post(
  "/login",
  csrfProtection,
  loginValidators,
  asyncHandler(async (req, res) => {
    console.log("1");
    const { userName, password } = req.body;

    let errors = [];
    const validatorErrors = validationResult(req);
    console.log(validatorErrors)
    console.log("2");

    if (validatorErrors.isEmpty()) {
      console.log("3");

      // Attempt to get the user by their email address.
      const user = await User.findOne({ where: { userName } });

      if (user !== null) {
        console.log("4");
        // If the user exists then compare their password
        // to the provided password.
        const passwordMatch = await bcrypt.compare(
          password,
          user.hashedPassword.toString()
        );

        if (passwordMatch) {
          // If the password hashes match, then login the user
          // and redirect them to the default route.
          loginUser(req, res, user);
          return res.redirect("/");
        }
      }
      console.log("5")
      // Otherwise display an error message to the user.
      errors.push("Login failed for the provided username and password");
    } else {
      errors = validatorErrors.array().map((error) => error.msg);
      console.log("6");
    }
    console.log("7");
    res.render("login", {
      title: "Login",
      userName,
      errors,
      csrfToken: req.csrfToken(),
    });
  })
);

router.post('/logout', (req, res) => {
  logoutUser(req, res);
  res.redirect('/');
})

module.exports = router;
