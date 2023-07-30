const express = require("express")


const app = express();

function logger(req, res, next) {
    const startTime = new Date();
  console.log(startTime)

    res.on("finish", () => {
      const endTime = new Date();
      console.log(endTime)
      
      const totalTime = endTime - startTime;
      console.log(`Total response time: ${totalTime}ms`);
    });
  
    console.log(req.method + " " + req.url);
    next();
  }
// app.use((req,res, next)=>{
//     console.log("hey its middleware")
//     next();
//     console.log("Log")
// })
app.use(logger)


app.get("/", (req, res)=>{
    res.send("this is home page.")
})

app.get("/details", (req, res)=>{
    // console.log("details route1")
    res.send("it's details page")
    // console.log("details route2")
})

app.listen(3000, ()=>{
    console.log("app listening to port on 3000")
})