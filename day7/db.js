const mongoose = require("mongoose");
require('dotenv').config()

// const connection = mongoose.connect("mongodb://localhost:27017/users");
const connection = mongoose.connect(process.env.MONGO_URL);

module.exports = { connection };
