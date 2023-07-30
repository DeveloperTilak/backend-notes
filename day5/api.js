const express = require("express");
const dbConnection = require("./mongodb");

const app = express();
app.use(express.json());

app.get("/", async (req, res) => {
  let data = await dbConnection();
  data = await data.find().toArray();

  res.send(data);
  console.log("data fetched successfully.");
});

app.post("/user", async (req, res) => {
  const data = await dbConnection();
  //   console.log(req.body)
  const result = await data.insertOne(req.body);

  res.send(result);

  console.log("data is posted successfully.");
});

app.put("/user/:name", async (req, res) => {
  let data = await dbConnection();
  let result = data.updateOne({ name: req.params.name }, { $set: req.body });

  res.send("updated successfully.");
  console.log("updated successfull.");
});

app.delete("/user/:name", async (req, res) => {
  let data = await dbConnection();

  let result = data.deleteOne({ name: req.params.name });

  res.send("deleted successfully.");
  console.log("deleted successfully.");
});

app.listen(3000, () => {
  console.log("server starts at 3000 port");
});
