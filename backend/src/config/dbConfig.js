const mongose = require("mongoose");

module.exports = async () =>{
    try {
        console.log("MONGO_URI =>", process.env.MONGO_URI); // 🔍 Debug
        await mongose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected Successfully To MongoDb ^_^');
        
    } catch (error) {
        console.log('Conniction Faild To MongoDb', error);
        process.exit(1);
    }
}