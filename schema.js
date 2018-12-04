const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const config = require('./config');


let  UserSchema = new  mongoose.Schema({
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true }    
})



UserSchema.pre('save',function(next){
    var user = this;
        if (!user.isModified('password')) return next();
        bcrypt.genSalt(config.SALT_FACTOR, function(err, salt) {
            if (err) return next(err);
            bcrypt.hash(user.password, salt, function(err, hash) {
                if (err) return next(err);
                user.password = hash;
                next();
            });
        })
    });

exports.model = mongoose.model('User',UserSchema,'user_table');

