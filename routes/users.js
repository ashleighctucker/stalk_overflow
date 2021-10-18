


const express = require('express');


const { User } = require("../db/models");
const { csrfProtection, asyncHandler } = require("./utils");


const router = express.Router();


const userValidators = [
  check("fullName")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a value for First Name")
    .isLength({ max: 50 })
    .withMessage("Full Name must not be more than 50 characters long"),
  check("userName")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a value for First Name")
    .isLength({ max: 50 })
    .withMessage("Username must not be more than 50 characters long")
    .custom((value) => {
      return db.User.findOne({ where: { userName: value } }).then((user) => {
        if (user) {
          return Promise.reject(
            "The provided username is already in use by another account"
          );
        }
      });
    }),
  check("emailAddress")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a value for Email Address")
    .isLength({ max: 100 })
    .withMessage("Email Address must not be more than 100 characters long")
    .isEmail()
    .withMessage("Email Address is not a valid email")
    .custom((value) => {
      return db.User.findOne({ where: { emailAddress: value } }).then(
        (user) => {
          if (user) {
            return Promise.reject(
              "The provided Email Address is already in use by another account"
            );
          }
        }
      );
    }),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a value for Password")
    .isLength({ max: 50 })
    .withMessage("Password must not be more than 50 characters long")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, "g")
    .withMessage(
      'Password must contain at least 1 lowercase letter, uppercase letter, number, and special character (i.e. "!@#$%^&*")'
    ),
  check("confirmPassword")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a value for Confirm Password")
    .isLength({ max: 50 })
    .withMessage("Confirm Password must not be more than 50 characters long")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Confirm Password does not match Password");
      }
      return true;
    }),
];


router.post('/',userValidators, asyncHandler(async(req,res)=>{ //creates a user
  const {
    fullName,
    userName,
    emailAddress,
    password
  } = req.body;

  const hashedPassword = await bcrypt.hash(password, 12);
  const user = User.create(
    {
      emailAddress,
      userName,
      fullName,
      hashedPassword
    });

  res.status(201).json({ user:
  {id:user.id}})
}));

module.exports = router;
