const mongose = require("mongoose");

module.exports = async () =>{
    try {
<<<<<<< HEAD
        console.log("MONGO_URI =>", process.env.MONGO_URI); // 🔍 Debug
        await mongose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected Successfully To MongoDb ^_^');
        
    } catch (error) {
        console.log('Conniction Faild To MongoDb', error);
        process.exit(1);
=======
        await mongose.connect(process.env.MONGO_URL);
        console.log('Connected Successfully To MongoDb ^_^');
        
    } catch (error) {
        console.log('Conniction Faild To MongoDb', error)
>>>>>>> 02ee4c8648a884a8a762606d5a950c7b57c4a980
    }
}