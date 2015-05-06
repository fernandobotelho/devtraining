var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
    development: {
        rootPath: rootPath,
        db: 'mongodb://localhost/devtraining',
        port: process.env.PORT || 3000
    },
    production: {
        rootPath: rootPath,
        db: 'mongodb://dbuser:dbpassword@ds031651.mongolab.com:31651/devtraining',
        port: process.env.PORT || 80
    }
};