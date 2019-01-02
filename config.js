module.exports = {
    TOKEN_SECRET:process.env.TOKEN_SECRET || "",
    
    PORT: process.env.PORT || 8081,

    MONGO_URL:process.env.MONGO_URL || "",

    SALT_FACTOR:10,

    AMQP_URL:process.env.AMQP_URL || "",

    AMQP_NEW_REGISTRATION_EXCHANGE:process.env.AMQP_NEW_REGISTRATION_EXCHANGE||"slomo.new.registrations",

    ALLOWED_ORIGIN:"http://sincere-name.surge.sh",

    TOKEN_HEADER:"x-slomo-auth,Content-Type, Access-Control-Allow-Headers"
}

