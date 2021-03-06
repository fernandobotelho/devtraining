var mongoose = require('mongoose');
var userModel = require('../models/user');
var courseModel = require('../models/course');

module.exports = function(config) {
    mongoose.connect(config.db);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error...'));
    db.once('open', function callback(){
        console.log('DevTraining database opened...');
    });

    userModel.createDefaultUsers();
    courseModel.createDefaultCourses();
};