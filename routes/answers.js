//External Imports
const express = require("express");
const { validationResult } = require("express-validator");

//Internal Imports
const { Answer } = require("../db/models");
const { asyncHandler, csrfProtection } = require("./utils");
const { answerValidators } = require("./validators");

const router = express.Router();

//API endpoint for adding an answer to a question
router.post(
  "questions/:id(\\d+)/answers",
  csrfProtection,
  answerValidators,
  asyncHandler(async (req, res) => {
    const { title, answer, questionId, userId } = req.body;
    const newAnswer = Answer.build({ title, answer, questionId, userId });

    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
      await newAnswer.save();
      //re routes to specific question page
      res.redirect(`/questions/${questionId}`);
    } else {
      const errors = validatorErrors.array().map((error) => error.msg);
      res.render("answer-question", {
        title: "Answer",
        answer,
        errors,
        csrfToken: req.csrfToken(),
      });
    }
  })
);

//* API endpoint for editing an Answer
router.post(
  "/edit/:id(\\d+)", // change?
  answerValidators,
  asyncHandler(async (req, res) => {
    const answerId = parseInt(req.params.id, 10);
    const updateAnswer = await Answer.findByPk(answerId);

    const { answer, title, questionId, userId } = req.body;

    const newAnswer = {
      answer,
      title,
      questionId,
      userId,
    };

    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
      await updateAnswer.update(newAnswer);
      res.redirect(`/questions/${questionId}`);
    } else {
      const errors = validatorErrors.array().map((error) => error.msg);
      res.render("edit-answer", {
        title: "Edit Answer",
        answer,
        errors,
        csrfToken: req.csrfToken(),
      });
    }
  })
);

//* API endpoint for deleting a answer
router.post(
  '/delete/:id(\\d+)',
  asyncHandler(async (req, res) => {
    const answerId = parseInt(req.params.id, 10);
    const answer = await Answer.findByPk(answerId);
    await answer.destroy();
    res.redirect('/');
  })
);

module.exports = router;
