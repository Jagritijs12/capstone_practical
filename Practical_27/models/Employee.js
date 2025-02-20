const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
  name: String,
  email: String,
  dob: Date,
  gender: String,
  skills: [String]
});

module.exports = mongoose.model("Employee", EmployeeSchema);
