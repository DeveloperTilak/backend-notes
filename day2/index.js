const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  if (req.url === "/sugar") {
    res.write("this is sugar");
    res.end();
  } else if (req.url === "/text") {
    fs.readFile("./Text.txt", "utf-8", (err, data) => {
      if (err) {
        res.write("there is an error");
        res.end();
      } else {
        res.write(data);
        res.end();
      }
    });
  } else if (req.url === "/postData" && req.method === "POST") {
    let str = "";

    req.on("data", (data) => {
      str += data;
    });
    
    str += "\n";
    req.on("end", () => {
      fs.appendFile("./data.txt", str, "utf-8", () => {
        console.log("data post done");
      });
    });

    res.write("data uploaded successfully");
    res.end();
  } else if (req.url === "/") {
    console.log("data GET req");
    res.end();
  }
});

server.listen(3000, () => {
  console.log("listening on port 3000");
});
