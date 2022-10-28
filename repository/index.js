// const { MongoClient } = require("mongodb");
// // Connection URI
// const uri =
//   "mongodb://127.0.0.1:27017";
// // Create a new MongoClient
// const client = new MongoClient(uri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// });

// // Database Name
// const dbName = 'dxlbuilder';

// async function run() {
//   try {
//     // Connect the client to the server (optional starting in v4.7)
//     await client.connect();
//     // Establish and verify connection
//     await client.db(dbName).command({ ping: 1 });
//     console.log("Connected successfully to server");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);

const mongoose = require("mongoose")

const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    // Get the default connection
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "MongoDB connection error:"));
}

module.exports = { connectDB }