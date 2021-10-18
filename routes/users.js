const express = require('express');


const { User } = require("../db/models");
const { csrfProtection, asyncHandler } = require("./utils");

const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});



module.exports = router;
