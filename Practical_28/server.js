const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");

const app = express();
const PORT = 5000;

// Middleware setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

// Session setup
app.use(
  session({
    secret: "my_secret_key",
    resave: false,
    saveUninitialized: true,
  })
);

// Dummy user data (replace with database later)
const users = [];

// Home Route
app.get("/", (req, res) => {
  res.render("login", { message: "" });
});

// Login Route
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);
  
  if (user && bcrypt.compareSync(password, user.password)) {
    req.session.user = user.username;
    res.redirect("/dashboard");
  } else {
    res.render("login", { message: "Invalid username or password!" });
  }
});

// Register Route
app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  
  users.push({ username, password: hashedPassword });
  res.redirect("/");
});

// Dashboard Route (Protected)
app.get("/dashboard", (req, res) => {
  if (!req.session.user) {
    return res.redirect("/");
  }
  res.render("dashboard", { user: req.session.user });
});

// Logout Route
app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
