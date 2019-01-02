const amqplib = require('amqplib');
const config = require('./config');
async function  publishToNewRegistrationExchange(user){
    //open connections
    const connection =  await amqplib.connect(config.AMQP_URL);
    try{
       
        const channel = await connection.createChannel();
        const exchange = await channel.checkExchange(config.AMQP_NEW_REGISTRATION_EXCHANGE);
        channel.publish(config.AMQP_NEW_REGISTRATION_EXCHANGE,"",Buffer.from(JSON.stringify(user)));
        await channel.close();
    }
    catch (e){
        throw e;
    }
    finally{
        connection.close();
    }
    
    //check exchange

    //create  channel 
    //publish
}
module.exports = publishToNewRegistrationExchange;

//exports.publishToNewRegistrationExchange = publishToNewRegistrationExchange;