const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { 
    type: String, 
    required: true, 
    unique: true, // Ensure email is unique
    trim: true,   // Trim whitespace from the beginning and end of the email
    lowercase: true, // Convert email to lowercase before saving
    match: /^[\w-]+@[a-zA-Z\d]+\.[a-zA-Z]+$/, // Match a valid email format
  },
  age: { 
    type: Number, 
    required: true, 
    min: 18, // Minimum age allowed is 18
    max: 100, // Maximum age allowed is 100
  },
  password: { 
    type: String, 
    required: true, 
    minlength: 4, // Minimum password length is 4 characters
    maxlength: 100, // Maximum password length is 100 characters
  },
});

const UserModel = mongoose.model("user", userSchema);

module.exports = { UserModel };
