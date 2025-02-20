const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const employeeRoutes = require("./routes/employeeRoutes");

const app = express();
app.set("view engine", "ejs");

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// ✅ Load Employee Routes
app.use("/employees", employeeRoutes);

// ✅ Default route to redirect to employees list
app.get("/", (req, res) => {
  res.redirect("/employees");
});

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/employeesDB", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
