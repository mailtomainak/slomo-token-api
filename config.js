module.exports = {
    TOKEN_SECRET:process.env.TOKEN_SECRET || 'SECRET',
    
    PORT: process.env.PORT || 8081,

    MONGO_URL:process.env.MONGO_URL || "",

    SALT_FACTOR:10
}