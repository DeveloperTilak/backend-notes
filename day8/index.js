const express = require("express");
const { connection } = require("./db_server");
const { SignupModel } = require("./models/SignUp.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const app = express();

app.use(express.json());
// app.use(express.json());

const authentication = (req, res, next) => {
  // const token = req.headers.authorization?.split(" ")[1]
  const { token } = req.query;

  if (!token) {
    res.send("please login first");
  } else {
    jwt.verify(token, "shhhhh", function (err, decoded) {
      if (err) {
        res.send("please login");
      } else {
        // res.send("you logedin");
        // console.log(decoded);
        next();
      }
    });
    // res.send("access the reports");
  }
};
app.get("/", (req, res) => {
  res.send("Home page");
});
app.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  bcrypt.hash(req.body.password, 5, async function (err, hash) {
    // Store hash in your password DB.
    const new_user = new SignupModel({
      email,
      password: hash,
    });

    await new_user.save();
    res.send(new_user);
    console.log("signup successfully.");
  });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await SignupModel.findOne({ email });
  // console.log(user)

  if (!user) {
    return res.send("login failed");
  } else {
    const hashed_pass = user.password;

    bcrypt.compare(password, hashed_pass, function (err, result) {
      // result == true
      if (result) {
        var token = jwt.sign({}, "shhhhh");

        return res.send({ message: "login successfully.", token: token });
      } else {
        res.send("Please provide correct password");
      }
    });
  }
});

app.get("/report", authentication, (req, res) => {
  // const { token } = req.query;
  // console.log(token)
  res.send("report accessed");
});

app.listen(3000, async () => {
  try {
    await connection;

    console.log("connected to db.");
  } catch (error) {
    console.log("failed to connect db.", error);
  }
  console.log("Server started at port on 3000");
});
