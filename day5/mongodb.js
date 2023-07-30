const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

const dbName = "users";

 async function dbConnection() {
  let result = await client.connect();

  let db = result.db(dbName);
  return db.collection("user");
  // const collection = db.collection("user")

  // const response =await collection.find({}).toArray()
  // console.log(response)
}

module.exports= dbConnection;