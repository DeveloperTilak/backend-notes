const dbConnection  = require("./mongodb")

const deleteData = async ()=>{

    const db = await dbConnection();

      const result = await db.deleteOne(
        {name:"Shubham"}
    )

    if(result.acknowledged){
        console.log("data deleted successfully.")
    }
}

deleteData();