// External Imports:
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

//Internal Imports:
const { sequelize } = require('./db/models');
const answersRouter = require('./routes/answers');
const frontEndRouter = require('./routes/front-end');
const questionsRouter = require('./routes/questions');
const searchRouter = require('./routes/search');
const usersRouter = require('./routes/users');
const { environment } = require('./config/index.js');
const { sessionSecret } = require('./config');
const { restoreUser } = require('./auth');

const app = express();

// view engine setup
app.set('view engine', 'pug');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(sessionSecret));
app.use(express.static(path.join(__dirname, 'public')));

const store = new SequelizeStore({ db: sequelize });
app.use(
  session({
    secret: sessionSecret,
    store,
    saveUninitialized: false,
    resave: false,
  })
);

store.sync();
app.use(searchRouter);
app.use(restoreUser);
app.use(answersRouter);
app.use(frontEndRouter);
app.use('/questions', questionsRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('The requested page could not be found.');
  err.status = 404;
  return next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error', {
    title: 'Oops!',
    environment,
  });
});

module.exports = app;
