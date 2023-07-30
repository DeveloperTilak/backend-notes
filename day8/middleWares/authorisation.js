const authorisation = (permittedRoles) => {
    return async (req, res, next) => {
      // const token = req.headers.authorization?.split(" ")[1];
  
      // let decoded = jwt.verify(token, process.env.SECRET_KEY);
      // console.log(decoded);
  
      // const user_id = decoded.user_id;
      // const user = await SignupModel.findOne({ _id: user_id });
  
      const user_role = req.userRole;
      // console.log("line 53",user_role.role)
  
      // console.log("line 55", permittedRoles)
  
      if (permittedRoles.includes(user_role.role)) {
        next();
      } else {
        res.send({ message: "unAuthorized" });
      }
    };
  };

  module.exports = {authorisation}