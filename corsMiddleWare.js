const enableCors = (req,res,next)=>{

    //temporarily  allowed . TODO change Origin
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "x-slomo-auth");
    next();
}

module.exports = enableCors;