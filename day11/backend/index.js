const express = require("express");



const { connection } = require("./config/db");
const { userRouter } = require("./routes/user.route");


const app = express();
app.use(express.json())


app.get("/", (req, res)=>{
    res.send("HomePage.")
})

app.use("/user", userRouter)

let PORT = 3000;

app.listen(PORT, async()=>{

    try {
        await connection
        console.log("Connected to db.")
        
    } catch (error) {
        console.log("Failed to connect db server.")
        console.log(error)
        
    }
    console.log(`Server started on port ${PORT}`);
})