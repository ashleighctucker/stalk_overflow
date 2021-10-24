//External Imports
const express = require("express");
const { validationResult } = require("express-validator");

//Internal Imports
const { Question, Vote } = require("../db/models");
const { asyncHandler, csrfProtection } = require("./utils");
const { questionValidators } = require("./validators");

const router = express.Router();

//API endpoint for posting/adding a new question
router.post(
  "/",
  csrfProtection,
  questionValidators,
  asyncHandler(async (req, res) => {
    const { question, title, categoryId } = req.body;
    const { userId } = req.session.auth;
    const newQuestion = Question.build({
      question,
      title,
      categoryId,
      userId,
    });
    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
      await newQuestion.save();
      const thisQuestion = await Question.findOne({
        where: {
          question,
          title,
          userId,
        },
      });
      return res.redirect(`/questions/view/${thisQuestion.id}`);
    } else {
      const errors = validatorErrors.array().map((error) => error.msg);
      return res.render('questions-ask', {
        title: 'Ask a Question',
        question,
        errors,
        csrfToken: req.csrfToken(),
      });
    }
  })
);

//API endpoint for editing a question
router.post(
  "/edit/:id(\\d+)",
  questionValidators,
  asyncHandler(async (req, res) => {
    const questionId = parseInt(req.params.id, 10);
    const questionToUpdate = await Question.findByPk(questionId);

    const { question, title, categoryId, userId } = req.body;
    const { userId: currUserId } = req.session.auth;
    const newQuestion = {
      question,
      title,
      categoryId,
      userId: currUserId,
    };

    const validatorErrors = validationResult(req);
    console.log(currUserId !== questionToUpdate.userId);
    if (currUserId !== questionToUpdate.userId) {
      const err = new Error("Unauthorized");
      err.status = 401;
      err.message = "Whoops! You do not have permission to edit this question.";
      err.title = "Unauthorized";
      throw err;
    }
    if (validatorErrors.isEmpty()) {
      await questionToUpdate.update(newQuestion);
      return res.redirect(`/questions/view/${questionId}`);
    } else {
      const errors = validatorErrors.array().map((error) => error.msg);
      res.render("question-edit", {
        title: "Edit Question",
        question: newQuestion,
        errors,
        csrfToken: req.csrfToken(),
      });
    }
  })
);

//API endpoint for deleting a question
router.post(
  "/delete/:id(\\d+)",
  asyncHandler(async (req, res) => {
    const questionId = parseInt(req.params.id, 10);
    const question = await Question.findByPk(questionId);
    await question.destroy();
    return res.redirect("/");
  })
);

//=============================================
module.exports = router;
