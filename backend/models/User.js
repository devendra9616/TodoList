const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxLength: 50,
  },
  email: {
    type: String,
    required: true,  
    unique: true,    
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  phone: {
    type: String,
  },
  description: {
    type: String,
    required: true,
    maxLength: 50,
  },
  createAt: {
    type: Date,
    default: Date.now,  // function reference only
  },
  updateAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema); 
