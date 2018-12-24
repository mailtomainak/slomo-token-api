module.exports = {
    TOKEN_SECRET:process.env.TOKEN_SECRET || 'SECRET',
    
    PORT: process.env.PORT || 8081,

    MONGO_URL:process.env.MONGO_URL || "",

    SALT_FACTOR:10,

    AMQP_URL:process.env.AMQP_URL || "",

    ALLOWED_ORIGIN:"http://sincere-name.surge.sh/",

    TOKEN_HEADER:"x-slomo-auth"
}