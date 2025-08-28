const mongose = require("mongoose");

module.exports = async () =>{
    try {
        await mongose.connect(process.env.MONGO_CLOUD_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected Successfully To MongoDb ^_^');
        
    } catch (error) {
        console.log('Conniction Faild To MongoDb', error);
        process.exit(1);
    }
}