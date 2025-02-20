const express = require("express");
const router = express.Router();
const Employee = require("../models/Employee");

// ✅ Display Employee List
router.get("/", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.render("employees", { employees });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Display Employee Form (Create New)
router.get("/new", (req, res) => {
  res.render("employeeForm", { employee: {} });
});

// ✅ Add New Employee
router.post("/", async (req, res) => {
  try {
    const { name, email, dob, gender, skills } = req.body;
    const newEmployee = new Employee({
      name,
      email,
      dob,
      gender,
      skills: skills ? (Array.isArray(skills) ? skills : [skills]) : [],
    });

    await newEmployee.save();
    res.redirect("/employees");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Display Edit Employee Form
router.get("/edit/:id", async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    res.render("employeeForm", { employee });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Update Employee
router.post("/update/:id", async (req, res) => {
  try {
    const { name, email, dob, gender, skills } = req.body;

    await Employee.findByIdAndUpdate(req.params.id, {
      name,
      email,
      dob,
      gender,
      skills: skills ? (Array.isArray(skills) ? skills : [skills]) : [],
    });

    res.redirect("/employees");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Delete Employee
router.get("/delete/:id", async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.redirect("/employees");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
