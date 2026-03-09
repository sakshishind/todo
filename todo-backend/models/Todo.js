const mongoose = require("mongoose");  

const todoSchema = new mongoose.Schema({
  title: String,
  desc: String,
  time: String,
  email: String,
  completed: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("Todo", todoSchema);