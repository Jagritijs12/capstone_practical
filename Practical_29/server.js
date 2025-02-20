const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const path = require("path");
const authRoutes = require("./routes/authRoutes");

const app = express();

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/auth_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public")); 
app.use(session({
  secret: "secretkey",
  resave: false,
  saveUninitialized: true
}));

// Set EJS as templating engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Routes
app.use(authRoutes);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
