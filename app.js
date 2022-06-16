var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var cors = require('cors')
var logger = require('morgan');
var indexRouter = require('./routes/index');
var adminRouter = require('./routes/admin');
var studentRouter = require('./routes/student');
var facultyRouter = require('./routes/faculty');
const { mongoose } = require('mongoose');
require('dotenv').config()


mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log('DB Connected :)');
}).catch((e) => {
  console.log(e);
})

var app = express();

// view engine setup

app.use(cors({"origin": "*"}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1/', indexRouter);
app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/student', studentRouter);
app.use('/api/v1/faculty', facultyRouter);

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
