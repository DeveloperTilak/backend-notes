const http = require("http")
const fs = require("fs")


const server = http.createServer((req,res) => {
    //logic for handling requests and sending relevant response
    if(req.url === "/abc"){
        res.write("hey")
        res.end()
    }
    else if(req.url === "/lecture"){
        fs.readFile("./lecture.txt", "utf-8", (err, data) => {
            if(err){
                res.write("Something went wrong, please try again later")
                res.end()
            }
            else{
                res.write(data)
                res.end()
            }
        })
    }
    else if(req.url === "/uploadprofile" && req.method === "POST"){
        let str = ""
        req.on("data", (data) => {
            str += data
        })
        str += "\n"
        req.on("end", () => {
            fs.appendFile("./data.txt", str, "utf-8", () => {
                console.log("data stored in the file")
            })
        })
        res.write("data successfully uploaded")
        res.end()
    }
    else if(req.url === "/profiles" && req.method === "GET"){
        fs.readFile("./data.txt", "utf-8", (err, data) => {
            res.write(data)
            res.end()
        })
    }
})

server.listen(8012, () => {
    console.log("listening on port 8012")
})