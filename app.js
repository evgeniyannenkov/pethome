"use strict";

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const dbConnection = require('./config/database');
const mongoStore = require('connect-mongo')(session);


//Routes
const routes = require('./routes/index');
const advert = require('./routes/advert');
const advertiser = require('./routes/advertiser');
const auth = require('./routes/auth');
const api = require('./routes/api');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//app.use(favicon(path.join(__dirname, 'assets', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: "user_authentication",
  resave: true,
  saveUninitialized: false,
  //Save Session to Database
  store: new mongoStore({
    mongooseConnection: dbConnection
  })
}));

// Passport
const passportConfigure = require('./config/passport');
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
passportConfigure();


app.use('/assets', express.static(path.join(__dirname, '/dist')));
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));


//Globals
app.use(( req, res, next ) => {
  res.locals = {
    currentUser : req.user
  };
  next();
});

app.use('/', routes);
app.use('/advert', advert);
app.use('/advertiser', advertiser);
app.use('/auth', auth);
app.use("/api", api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
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
