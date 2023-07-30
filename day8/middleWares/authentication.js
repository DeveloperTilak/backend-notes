const jwt = require("jsonwebtoken");

const { SignupModel } = require("../models/SignUp.model");

const authentication = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    // const { token } = req.query;
  
    if (!token) {
      res.send("please login first");
    } else {
      jwt.verify(token, process.env.SECRET_KEY, async function (err, decoded) {
        if (err) {
          res.send("please login");
        } else {
           
          const user_id = decoded.user_id;
          const user = await SignupModel.findOne({ _id: user_id });
  
          req.userRole= user;
          next();
        }
      });
      // res.send("access the reports");
    }
  };

  module.exports = {authentication}