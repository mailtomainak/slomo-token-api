const config = require('./config');

const enableCors = (req,res,next)=>{
    
    res.header("Access-Control-Allow-Origin", config.ALLOWED_ORIGIN);
    res.header("Access-Control-Allow-Headers", config.TOKEN_HEADER);
    next();
}

module.exports = enableCors;