const enableCors = (req,res,next)=>{

    //temporarily  allowed . TODO change Origin
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
}

module.exports = enableCors;