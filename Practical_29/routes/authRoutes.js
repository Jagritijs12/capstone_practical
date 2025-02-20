const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const router = express.Router();

// Show Login Page
router.get("/login", (req, res) => {
  res.render("login", { error: null });
});

// Show Register Page
router.get("/register", (req, res) => {
  res.render("register", { error: null });
});

// Handle Registration
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await User.create({ username, password: hashedPassword });
    res.redirect("/login");
  } catch (err) {
    res.render("register", { error: "Username already exists" });
  }
});

// Handle Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.render("login", { error: "Invalid credentials" });
  }

  req.session.user = user;
  res.redirect("/dashboard");
});

// Dashboard Page (Protected)
router.get("/dashboard", (req, res) => {
  if (!req.session.user) {
    return res.redirect("/login");
  }
  res.render("dashboard", { username: req.session.user.username });
});

// Logout
router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
});

// Show All Registered Users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find({}, "username");
    res.render("users", { users });
  } catch (error) {
    res.send("Error fetching users.");
  }
});

module.exports = router;
