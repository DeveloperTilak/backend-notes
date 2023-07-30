const express = require("express"); //CJS-(Common JS) METHOD OF IMPMPORT
const fs = require("fs");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));


const app = express();
app.use(express.json());
app.use(express.text());

// console.log(app)

// Client ID
const client_id= "4a05790109ad323e1e2b";
const client_secret = "217ef2df467998fba81b4cf672baf86ac20245f9"



app.get("/", (req, res) => {
  res.send("this is home page");
});
app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});



app.get("/lecture", (req, res) => {
  res.send("this is lecture route.");
  // console.log(req.url);
});
app.get("/auth/github", async(req, res) => {

  const {code} = req.query;
  console.log(code)

  const accessToken = await fetch("https://github.com/login/oauth/access_token",{

  method:"POST",
  headers: {
    Accept: "application/json",
    "content-type": "application/json"
  },
  body:JSON.stringify(
    {
      client_id:client_id,
      client_secret: client_secret,
      code:code 

    }
  )
  }).then((res)=> res.json())
const {access_token} = accessToken;
  console.log(access_token)

  
  const user = await fetch("https://api.github.com/user", {
    headers : {
        Authorization: `Bearer ${access_token}`
    }
})
.then((res) => res.json())

res.send("Welcome " + user.name)
  // console.log(req.url);
});
  

 

app.listen(3000, () => {
  console.log("listening to port 3000");
});
