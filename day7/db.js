const mongoose = require("mongoose");

// const connection = mongoose.connect("mongodb://localhost:27017/users");
const connection = mongoose.connect("mongodb+srv://tilakram5075:PHZa62R30sZNCsFv@cluster0.ec2e6hg.mongodb.net/users");

module.exports = { connection };
