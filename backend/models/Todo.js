const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxLength: 50,
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

module.exports = mongoose.models.Todos || mongoose.model("Todos", todoSchema);

