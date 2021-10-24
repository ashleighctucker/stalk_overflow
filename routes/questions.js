//External Imports
const express = require('express');
const { validationResult } = require('express-validator');

//Internal Imports
const { Question } = require('../db/models');
const { asyncHandler, csrfProtection } = require('./utils');
const { questionValidators } = require('./validators');

const router = express.Router();

//API endpoint for posting/adding a new question
router.post(
  '/',
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
      res.redirect(`/questions/view/${thisQuestion.id}`);
    } else {
      const errors = validatorErrors.array().map((error) => error.msg);
      res.render('questions-ask', {
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
  '/edit/:id(\\d+)',
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
      const err = new Error('Unauthorized');
      err.status = 401;
      err.message = 'Whoops! You do not have permission to edit this question.';
      err.title = 'Unauthorized';
      throw err;
    }
    if (validatorErrors.isEmpty()) {
      await questionToUpdate.update(newQuestion);
      res.redirect(`/questions/view/${questionId}`);
    } else {
      const errors = validatorErrors.array().map((error) => error.msg);
      res.render('question-edit', {
        title: 'Edit Question',
        question: newQuestion,
        errors,
        csrfToken: req.csrfToken(),
      });
    }
  })
);

//API endpoint for deleting a question
router.post(
  '/delete/:id(\\d+)',
  asyncHandler(async (req, res) => {
    const questionId = parseInt(req.params.id, 10);
    const question = await Question.findByPk(questionId);
    await question.destroy();
    res.redirect('/');
  })
);



//? @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

//* Route for Questions ----- Upvote / Increment vote

router.post(
  `/questions/:questionId/upvote`,
  asyncHandler(async (req, res) => {
    //update the score inside pug
    const { questionId } = req.params; // from ----- /questions/:questionId/upvote & pug (middlie li)

    // check if the user already voted
    let userId = req.session.auth.userId;
    const hasVoted = await Vote.findOne({
      where: {
        userId: Number(userId),
        questionId: Number(questionId),
      },
    });

    const question = await Question.findByPk(questionId);
    let questionScore = question.questionScore;
    // console.log("wert", userId, questionId, hasVoted);
    if (!hasVoted) {
      // have NOT voted
      // updates  the score
      questionScore++;
      question.update({ questionScore });

      // if a user has NOT voted, update Vote table
      await Vote.create({
        userId: userId,
        questionId: questionId,
        vote: 1, //up vote
      });
      // send questionScore to the front end
      res.json({ questionScore: question.questionScore });
      // return;
    } else {
      // if they HAVE voted. no update. can't vote again
      // console.log("gdf", hasVoted);

      //(1) if hasVote.vote = 1,
      // ------ set hasVote.vote = 0.(update)
      // ------ decrement the score
      // ------ questionScore--;
      // ------ question.update({ questionScore });

      // (2) else if hasVote.vote = -1
      // ------ set hasVote.vote = 1.(update)
      // ------ increment the score
      // ------ questionScore += 2;
      // ------ question.update({ questionScore });

      // (3) else if hasVote.vote = 0
      // ------ set hasVote.vote = 1.(update)
      // ------ increment the score
      // ------ questionScore++;
      // ------ question.update({ questionScore });

      // try {
      if (hasVoted.vote === 1) {
        hasVoted.update({ vote: 0 });
        questionScore--;
        question.update({ questionScore });
      } else if (hasVoted.vote === -1) {
        hasVoted.update({ vote: 1 });
        questionScore += 2;
        question.update({ questionScore });
      } else if (hasVoted.vote === 0) {
        hasVoted.update({ vote: 1 });
        questionScore++;
        question.update({ questionScore });
      }

      // } catch (e){
      //   console.log(e)
      // }
      res.json({ questionScore: question.questionScore });
    }
    return;
  })
);

//? @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@


//* Route for Questions ------ DownVote / Decrement vote

router.post(
  `/questions/:questionId/downvote`,
  asyncHandler(async (req, res) => {
    //update the score inside pug
    const { questionId } = req.params; // from ----- /questions/:questionId/upvote & pug (middlie li)

    // check if the user already voted
    let userId = req.session.auth.userId;
    const hasVoted = await Vote.findOne({
      where: {
        userId: Number(userId),
        questionId: Number(questionId),
      },
    });

    const question = await Question.findByPk(questionId); // from req.params ?
    let questionScore = question.questionScore; // (__.____) 2nd one is from Model
    // console.log("wert", userId, questionId, hasVoted);
    if (!hasVoted) {
      // have NOT voted
      // updates  the score
      questionScore--;
      question.update({ questionScore });

      // if a user has NOT voted, update Vote table
      await Vote.create({
        userId: userId,
        questionId: questionId,
        vote: -1, //up vote
      });
      // send questionScore to the front end
      res.json({ questionScore: question.questionScore });
      // return;
    } else {
      // if they HAVE voted. no update. can't vote again
      // console.log("gdf", hasVoted);

      //(1) if hasVote.vote = -1,
      // ------ set hasVote.vote = 0.(update)
      // ------ increment the score
      // ------ questionScore++;
      // ------ question.update({ questionScore });

      // (2) else if hasVote.vote = 1
      // ------ set hasVote.vote = -1.(update)
      // ------ decrement the score
      // ------ questionScore -= 2;
      // ------ question.update({ questionScore });

      // (3) else if hasVote.vote = 0
      // ------ set hasVote.vote = -1.(update)
      // ------ decrement the score
      // ------ questionScore--;
      // ------ question.update({ questionScore });

      // try {
      if (hasVoted.vote === -1) {
        hasVoted.update({ vote: 0 });
        questionScore++;
        question.update({ questionScore });
      } else if (hasVoted.vote === 1) {
        hasVoted.update({ vote: -1 });
        questionScore--;
        question.update({ questionScore });
      } else if (hasVoted.vote === 0) {
        hasVoted.update({ vote: -1 });
        questionScore--;
        question.update({ questionScore });
      }

      // } catch (e){
      //   console.log(e)
      // }
      res.json({ questionScore: question.questionScore });
    }
    return;
  })
);


//=============================================
module.exports = router;
