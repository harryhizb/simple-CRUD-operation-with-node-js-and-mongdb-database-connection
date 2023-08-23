const { MongoClient, ObjectId } = require("mongodb");
const dotenv = require("dotenv");

dotenv.config();
const client = new MongoClient(process.env.uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect();
console.log("Connected to MongoDB");

const db = client.db("libraryManagementSystem");

module.exports = { client, ObjectId, db };
