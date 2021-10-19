const express = require('express');
const { environment } = require("../config");
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  console.log('hit the router');
  res.render('index', { title: 'Stalk Overgrow Home' });
});

if (environment !== "production") {
  router.get("/error-test", () => {
    throw new Error("This is a test error.");
  });
}

module.exports = router;
