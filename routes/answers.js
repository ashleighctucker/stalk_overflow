//External Imports
const express = require("express");
const { validationResult } = require("express-validator");

//Internal Imports
const { Answer, Vote } = require("../db/models");
const { asyncHandler, csrfProtection } = require("./utils");
const { answerValidators } = require("./validators");

const router = express.Router();

//API endpoint for adding an answer to a question
router.post(
  "/questions/:id(\\d+)/answers",
  answerValidators,
  asyncHandler(async (req, res) => {
    const { title, answer, questionId, userId } = req.body;
    const newAnswer = Answer.build({ title, answer, questionId, userId });

    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
      await newAnswer.save();
      //re routes to specific question page - un-comment and replace once we have that page done
      // res.redirect(`/questions/${questionId}`);
      res.redirect(`/`);
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

//API endpoint for editing an answer to a question
router.post(
  "/answers/edit/:id(\\d+)",
  answerValidators,
  asyncHandler(async (req, res) => {
    const answerId = parseInt(req.params.id, 10);
    const answerToUpdate = await Answer.findByPk(answerId);

    const { title, answer, questionId, userId } = req.body;

    const newAnswer = {
      title,
      answer,
      questionId,
      userId,
    };

    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
      await answerToUpdate.update(newAnswer);
      //re routes to specific question page - un-comment and replace once we have that page done
      // res.redirect(`/questions/${questionId}`);
      res.redirect(`/`);
    } else {
      const errors = validatorErrors.array().map((error) => error.msg);
      res.render("answer-edit", {
        title: "Edit Answer",
        answer,
        errors,
        csrfToken: req.csrfToken(),
      });
    }
  })
);

//API endpoint for deleting an answer to a question
router.post(
  "/answers/delete/:id(\\d+)",
  asyncHandler(async (req, res) => {
    const answerId = parseInt(req.params.id, 10);
    const answer = await Answer.findByPk(answerId);
    await answer.destroy();
    res.redirect("/");
  })
);


//* Route for Answers ----- Upvote / Increment vote
router.post(
  `/answers/:answerId/upvote`,
  asyncHandler(async (req, res) => {
    const { answerId } = req.params;

    // check if the user already voted
    let userId = req.session.auth.userId;
    const hasVoted = await Vote.findOne({
      where: {
        userId: Number(userId),
        answerId: Number(answerId),
      },
    });

    const answer = await Answer.findByPk(answerId);
    let answerScore = answer.answerScore;
    if (!hasVoted) {
      answerScore++;
      answer.update({ answerScore });

      // if a user has NOT voted, update Vote table
      await Vote.create({
        userId: userId,
        answerId: answerId,
        vote: 1,
      });
      res.json({ answerScore: answer.answerScore });
    } else {
      // if they HAVE voted. no update. can't vote again

      if (hasVoted.vote === 1) {
        hasVoted.update({ vote: 0 });
        answerScore--;
        answer.update({ answerScore });
      } else if (hasVoted.vote === -1) {
        hasVoted.update({ vote: 1 });
        answerScore += 2;
        answer.update({ answerScore });
      } else if (hasVoted.vote === 0) {
        hasVoted.update({ vote: 1 });
        answerScore++;
        answer.update({ answerScore });
      }

      res.json({ answerScore: answer.answerScore });
    }
    return;
  })
);


//* Route for Answers ------ DownVote / Decrement vote
router.post(
  `/answers/:answerId/downvote`,
  asyncHandler(async (req, res) => {
    const { answerId } = req.params;
    // check if the user already voted
    let userId = req.session.auth.userId;
    const hasVoted = await Vote.findOne({
      where: {
        userId: Number(userId),
        answerId: Number(answerId),
      },
    });

    const answer = await Answer.findByPk(answerId);
    let answerScore = answer.answerScore;
    if (!hasVoted) {

      answerScore--;
      answer.update({ answerScore });

      // if a user has NOT voted, update Vote table
      await Vote.create({
        userId: userId,
        answerId: answerId,
        vote: -1, //up vote
      });
      res.json({ answerScore: answer.answerScore });
    } else {
      // if they HAVE voted. no update. can't vote again

      if (hasVoted.vote === -1) {
        hasVoted.update({ vote: 0 });
        answerScore++;
        answer.update({ answerScore });
      } else if (hasVoted.vote === 1) {
        hasVoted.update({ vote: -1 });
        answerScore--;
        answer.update({ answerScore });
      } else if (hasVoted.vote === 0) {
        hasVoted.update({ vote: -1 });
        answerScore--;
        answer.update({ answerScore });
      }

      res.json({ answerScore: answer.answerScore });
    }
    return;
  })
);

module.exports = router;
