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
app.get("/todos", (req, res) => {
  fs.readFile("./db.json", "utf-8", (err, data) => {
    if (err) {
      res.send("There is an error.");
    }

    const parse_data = JSON.parse(data);

    res.send(parse_data.todos);
  });
});

app.post("/todos", (req, res) => {
  const new_todo = req.body;
  // console.log(new_todo);

  fs.readFile("./db.json", "utf-8", (err, data) => {
    // console.log(data)
    let parsed_data = JSON.parse(data);
    let todo = parsed_data.todos;
    // console.log(todo);

    todo.push(new_todo);
    // console.log(todo);

    let new_data = JSON.stringify(parsed_data);

    fs.writeFile("./db.json", new_data, "utf-8", (err) => {
      if (err) {
        return res.send("there is err");
      }
      res.send("data post successfully.");
    });
  });
});

app.delete("/todos/:id", (req, res)=>{

     const {id} = req.params
    // console.log(id)


    fs.readFile("./db.json", "utf-8", (err, data)=>{


      let whole_data = JSON.parse(data);
      let todoData = whole_data.todos

      
      // console.log(todoData)


      const index = todoData.findIndex((ele) => ele.id == parseInt(id));

      console.log(index)
      if(index === -1){
        return res.send("Todo not found.")
      }


      todoData.splice(index, 1);

      let new_data = JSON.stringify(whole_data)

      fs.writeFile("./db.json", new_data, "utf-8", (err)=>{

        if(err){
          return res.send("there was some error.")
        }
        res.send("delete successfully.")
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

app.listen(3000, () => {
  console.log("listening to port 3000");
});
