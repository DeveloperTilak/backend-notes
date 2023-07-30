const dbConnection = require("./mongodb")


const insertData = async()=>{
    
    console.log("insert funtion")


    const db = await dbConnection();
    const result = await db.insertOne(
        {name:"Shubham",
        email:"shubham@gmail.com",
        age:21,
        password:"shubham"
    }
    );

    if(result.acknowledged){
        console.log("data inserted successfully.")
    }

     
}

insertData()