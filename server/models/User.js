var mongoose = require('mongoose');
var encryption = require('../utilities/encryption');

var userSchema = mongoose.Schema({
    firstName: {type:String, required:'{PATH} is required!'},
    lastName: {type:String, required:'{PATH} is required!'},
    userName: {
        type:String,
        required:'{PATH} is required!',
        unique:true
    },
    salt: {type:String, required:'{PATH} is required!'},
    hashed_pwd: {type:String, required:'{PATH} is required!'},
    roles: [String]
});

userSchema.methods = {
    checkPassword: function(passwordToMatch) {
        return encryption.hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
    },
    hasRole: function(role) {
        return this.roles.indexOf(role) > -1;
    }
};

var User = mongoose.model('User', userSchema);

function createDefaultUsers(){
    User.find({}).exec(function(err, collection){
        if (collection.length === 0) {
            var salt = encryption.createSalt();
            var hash = encryption.hashPwd(salt, 'admin');
            User.create({firstName:'Admin', lastName:'(System)', userName:'admin@admin.com', salt:salt, hashed_pwd:hash, roles:['admin']});

            salt = encryption.createSalt();
            hash = encryption.hashPwd(salt, 'user');
            User.create({firstName:'User', lastName:'(Default)', userName:'user@user.com', salt:salt, hashed_pwd:hash, roles:[]});
        }
    });
};

exports.createDefaultUsers = createDefaultUsers;