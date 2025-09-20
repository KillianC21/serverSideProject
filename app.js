var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser'); //incoming in cookie requests
var logger = require('morgan');
var mongoose = require('mongoose');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var bookRouter = require('./routes/bookRouter'); //route file
var clientRouter = require('./routes/clientRouter');
var aboutRouter = require('./routes/aboutRouter');
var contactRouter = require('./routes/contactRouter');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


const url = 'mongodb://localhost:27017/booksession';
const connect = mongoose.connect(url); //promise stored in "connect" variable.

connect.then((db) => {
  console.log("Connected correctly to server");

}, (err) => {console.log(err); });

app.use('/', indexRouter);

//app.use('/users', usersRouter);

app.use('/booksession', bookRouter); //.ejs file and route file as a parameter

app.use('/viewClients', clientRouter); //app.use mount middleware

app.use('/about', aboutRouter);

app.use('/contact', contactRouter);
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
  const status = (err.status || 500);
  res.status(status);
  res.render('error', {status: status });
});

module.exports = app;
