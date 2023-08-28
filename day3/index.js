const express = require("express"); //CJS-(Common JS) METHOD OF IMPMPORT
const fs = require("fs");

const app = express();
app.use(express.json());
app.use(express.text());

// console.log(app)

app.get("/", (req, res) => {
  res.send("this is home page");
});

app.get("/lecture", (req, res) => {
  res.send("this is lecture route.");
  // console.log(req.url);
});
app.post("/lecture", (req, res) => {
  // console.log(req.body);
  res.send("post successfully.");
});

app.get("/posts", (req, res) => {
  fs.readFile("./posts.json", "utf-8", (err, data) => {
     if (err) {
      res.send("There is an error.");
    }
    res.send(data);
  });
});
 

app.get("/todos", (req, res)=>{


  fs.readFile("./db.json", "utf-8", (err, data)=>{

    if(err){
      return res.status(500).send("Error: occurrs while reading file.")
    }

     const parsed_data= JSON.parse(data);

     res.status(200).send(parsed_data)

  })

})







app.post("/todos", (req, res)=>{

  const user_data = req.body;


  fs.readFile("./db.json", "utf-8", (err, data)=>{

    if(err){
      return res.status(500).send("There is an error.")
    }

   const parsed_data= JSON.parse(data)

     parsed_data.todos.push(user_data);


    fs.writeFile("./db.json", JSON.stringify(parsed_data), "utf-8", (err)=>{

      if(err){
        return res.status(500).send("There is an error.")
      }
      res.status(200).send("Successfully post data.")
    })
  })
})
 


app.delete("/todo/:id", (req, res)=>{

  const {id} = req.params

  console.log(id)
  fs.readFile("./db.json", "utf-8", (err, data)=>{



    if(err){
      return res.status(500).send("There is an error, while reading the data")
    }
   const parse_data= JSON.parse(data)
   const todo  = parse_data.todos

   const index = todo.findIndex((ele)=> ele.id === parseInt(id))

   if(index===-1){
      return res.status(404).send("not found data")
   }
   
   todo.splice(index, 1);

   fs.writeFile("./db.json", JSON.stringify(parse_data), "utf-8", (err)=>{


    if(err){
      return res.status(500).send("Error occurrs")
    }

    res.status(200).send("Successfully deleted data.")
   })
  })
})
app.get("/instructor", (req, res) => {
  fs.readFile("./db.json", "utf-8", (err, data) => {
    if (err) {
      res.send("There is an error.");
    }

    const parse_data = JSON.parse(data);

    res.send(parse_data.instructor);
  });
});

app.get("/lecture/:lecture_id", (req, res) => {
  const { lecture_id } = req.params;

  fs.readFile(`../day${lecture_id}/lect.txt`, "utf-8", (err, data) => {
    if (err) {
      // console.log(err);
      return res.status(500).send("error occure");
    }
    res.status(200).send(data);
  });
  // res.send("This is notes for " )
  // console.log(req.params);
});

app.get("/welcome", (req, res) => {
  // passing multiple query: http://localhost:3000/welcome?name=tilak&age=21&edu=dev
  const { name, age, edu } = req.query;

  const user = name || "user";

  const elegible = age > 20 ? "You are elegible" : "You are not elegible";
  res.send(
    "Welcome " + user.toUpperCase() + " age: " + elegible + " edu: " + edu
  );
  // console.log(name, age);
});

app.use( "*", (req, res)=>{
  res.status(404).send("not found this endpoint")
})

app.listen(3000, () => {
  console.log("listening to port 3000");
});
