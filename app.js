require('dotenv').config()
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');

const connectDb = require('./config/db');
const sendMailCron = require('./helpers/campaignscron');

// Connect to MongoDB
connectDb();

sendMailCron({
  seconds: 0, minutes: 31, hours: 13, day: '*'
});

// Initialize App
const app = express();

// Passport Config
require('./config/passport')(passport);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Log Routes
app.use(logger('dev'));

// Body Parser
app.use(express.urlencoded({ extended: false }));

// Express Session
app.use(session({
  secret: 'harisiqbal',
  resave: true,
  saveUninitialized: true
}));

// Connect Flash
app.use(flash());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Other Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Global Variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');            // Error from Passport
  res.locals.user = req.user;
  next();
});

// Routes Configuration
app.use('/', require('./routes/index'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
