var express = require('express');
var swig = require('swig');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var job = require('./routes/job/timer');
assert = require('assert');

var routes = require('./routes/index');
var students = require('./routes/admin/students');
var students_level = require('./routes/admin/students_level');
var lib_single_sel = require('./routes/lib/single_sel');
var fight_single_sel = require('./routes/fight/single_sel');
var record_single_sel = require('./routes/record/single_sel');
var system_log = require('./routes/system/log');

var app = express();

// init

// view engine setup
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/admin/students', students);
app.use('/admin/students/level', students_level);
app.use('/lib/single_sel', lib_single_sel);
app.use('/fight/single_sel', fight_single_sel);
app.use('/record/single_sel', record_single_sel);
app.use('/system/log', system_log);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
