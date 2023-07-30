 const dbConnection = require("./mongodb")
// dbConnection().then((res)=>{
//     res.find({}).toArray().then((data)=>{
//         console.log(data)
//     })
// })

const main = async () => {
  let data = await dbConnection();

  data = await data.find({name: "Tilak"}).toArray();
  console.log(data);
};

main();
