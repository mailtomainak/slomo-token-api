const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const config = require('./config');
const publishToExchange = require('./newRegExchPub');

let  UserSchema = new  mongoose.Schema({
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true }    
})



const pushDataToNewRegistrationExchange= async (doc,next)=>{
    console.log('inside');
    try{
        await  publishToExchange(doc.username);
        next({_id:doc._id,username:doc.username});
    }
    catch(e){
        next(e);
    }
    
    
}

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

UserSchema.post('save',pushDataToNewRegistrationExchange);
//UserSchema.post('save',removePasswordFromResponse);

exports.model = mongoose.model('User',UserSchema,'user_table');

