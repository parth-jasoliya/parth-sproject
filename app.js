var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dashboard = require('./routes/dashboard');
var signup = require('./routes/signup');
var add_cat= require('./routes/addnewcat');
var all_cat= require('./routes/all_cat');
var add_pass= require('./routes/add_pss');
var all_pass= require('./routes/all_pass');
var pass_details= require('./routes/pass_details');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/dashboard', dashboard);
app.use('/signup', signup);
app.use('/users', usersRouter);
app.use('/add-new-cat', add_cat);
app.use('/category', all_cat);
app.use('/add-new-pass', add_pass);
app.use('/allpassword', all_pass);
app.use('/pass_details', pass_details);

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
