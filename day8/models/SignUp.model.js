const mongoose = require("mongoose")




const signupSchema = mongoose.Schema(
    {

        name: String,
        age: Number,
        email: String,
        password: String
        
    }
)


const SignupModel = mongoose.model("signup", signupSchema);


module.exports = {SignupModel}