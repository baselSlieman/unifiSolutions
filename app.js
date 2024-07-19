require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
const cors=require('cors')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoos =require('mongoose');
const url = process.env.MONGO_URL;
try{
mongoos.connect(url);
  console.log("success connect to dbserver");
}catch(error){
  console.log(error.message);
}
const httpStatusText =require('./helper/httpStatustext');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const { log } = require('console');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);


// catch 404 and forward to error handler
app.all("*",function(req, res, next) {
  return res.status(404).json({status:httpStatusText.Error,message:"the resource is not availabe"})
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
