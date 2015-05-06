var express = require('express');
var path = require('path');
var stylus = require('stylus');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');

module.exports = function(app, config) {
    app.use(express.static(path.join(config.rootPath, 'public')));

    app.set('views', path.join(config.rootPath, '/server/views'));
    app.set('view engine', 'jade');

    app.use(logger('dev'));
    app.use(cookieParser());
    app.use(bodyParser());
    app.use(session({secret: 'multi vision unicorns'}));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(stylus.middleware({
        src: path.join(config.rootPath, 'public'),
        compile: function (str, path) {
            return stylus(str).set('filename', path);
        }
    }));
};