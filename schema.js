const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const config = require('./config');
const publishToExchange = require('./newRegExchPub');

let  UserSchema = new  mongoose.Schema({
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true }    
})



const pushDataToNewRegistrationExchange= async (doc,next)=>{
   
    try{
        await  publishToExchange({username:doc.username,userId:doc._id});
        next();
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


exports.model = mongoose.model('User',UserSchema,'user_table');

