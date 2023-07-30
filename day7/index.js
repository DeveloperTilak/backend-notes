const express = require("express");
const { connection } = require("./db");
// const { UserModel } = require("./db");
const { UserModel } = require("./modles/User.model");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("response");
});


//1.get data

app.get("/users", async (req, res) => {
  const user = await UserModel.find();

  res.send(user);
});


//2. Post data

app.post("/users", async (req, res) => {
  //   const user = await UserModel.insertMany(req.body);

  const new_user = new UserModel(req.body);

  await new_user.save();

  console.log("post successfully.");
  res.send(new_user);
});



//3. Delete data

app.delete("/users/:id", async (req, res) => {
  const user = await UserModel.findByIdAndDelete(req.params.id);

  if (!user) {
    return res.send("Product Not Found.");
  }
  res.send(user);
  console.log("deleted successfully.");
});


//4. Update data
app.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const updated_data = req.body;

  // console.log(id, updated_data);

  const user = await UserModel.findByIdAndUpdate(id, updated_data);

  res.status(200).send("Updated Successfully.");
  console.log("updated...", user);
});

//below app.use will handle random rotues.


app.use((req, res, next) => {
  res.status(404).send("Sorry, the requested page or API endpoint was not found.");
});

app.listen(3000, async () => {
  try {
    await connection;
    console.log("connected to db");
  } catch (error) {
    console.log(error);
    console.log("faild connect to db");
  }

  console.log("servert started on port 3000");
});
