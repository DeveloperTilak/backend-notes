const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require('dotenv').config()


// console.log(process.env.SECRET_KEY)

const { connection } = require("./db_server");
const { SignupModel } = require("./models/SignUp.model");

const app = express();

app.use(express.json());

//Authorisation
const authorisation = async (req, res, next)=>{

  const token = req.headers.authorization?.split(" ")[1]

          let decoded = jwt.verify(token, process.env.SECRET_KEY);
          console.log(decoded)

          const user_id = decoded.user_id;
          const user  = await SignupModel.findOne({_id: user_id})

          const role = user.role;

          if(role == "customer" && req.url ==="/contact" && req.method == "GET"){
            next();
          }
          else if(role == "maintainer" && req.url ==="/details" && req.method == "GET"){
            next();
          }
            else{
              res.send({"message": "unAuthorized"})
            }
}


//Authentication
const authentication = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]
  // const { token } = req.query;

  if (!token) {
    res.send("please login first");
  } else {
    jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
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

//home route
app.get("/", (req, res) => {
  res.send("Home page");
});

//signup Endpoint post Method
app.post("/signup", async (req, res) => {
  const { email, password, name, age,role } = req.body;

  bcrypt.hash(password, 5, async function (err, hash) {
    // Store hash in your password DB.
    const new_user = new SignupModel({
      name,
      age,
      email,
      password: hash,
      role
    });

    await new_user.save();
    res.send(new_user);
    console.log("signup successfully.");
  });
});


//login endpoint post method 
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
        var token = jwt.sign({user_id : user._id}, process.env.SECRET_KEY);

        return res.send({ message: "login successfully.", token: token });
      } else {
        res.send("Please provide correct password");
      }
    });
  }
});


//report endpoint get method
app.get("/report", authentication, (req, res) => {
  // const { token } = req.query;
  // console.log(token)
  res.send("report accessed");
});

app.get("/contact", authentication, authorisation, async (req, res) => {
  res.send("here are the contact info")  
})

app.get("/details", authentication,authorisation, (req, res) => {
res.send("here are the details")  
})

//server starts at 
app.listen(3000, async () => {
  try {
    await connection;

    console.log("connected to db.");
  } catch (error) {
    console.log("failed to connect db.", error);
  }
  console.log("Server started at port on 3000");
});
