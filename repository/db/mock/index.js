const mongoose = require("mongoose");
mongoose.set('strictQuery', false);

const { MongoMemoryServer } = require("mongodb-memory-server");
module.exports = {
    connect: async () => {
        const mongod = await MongoMemoryServer.create();
        const uri = mongod.getUri();
    
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    },
    closeDB: async () => {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();

        const mongod = await MongoMemoryServer.create();
        await mongod.stop();
    },
    clearDB: async () => {
        const collections = mongoose.connection.collections;
        for(const key in collections){
             const collection = collections[key];
             await collection.deleteMany();
        }
     }
};