const express = require("express");
const router = express.Router();

// Sample employee data
let employees = [
    { id: 1, name: "Alice", position: "Developer" },
    { id: 2, name: "Bob", position: "Designer" }
];

// GET - Fetch all employees
router.get("/employees", (req, res) => {
    res.json(employees);
});

// POST - Add a new employee
router.post("/employees", (req, res) => {
    const newEmployee = req.body;
    employees.push(newEmployee);
    res.json({ message: "Employee added", employees });
});

// PUT - Update an employee
router.put("/employees/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const updatedEmployee = req.body;

    employees = employees.map(emp => (emp.id === id ? updatedEmployee : emp));
    res.json({ message: "Employee updated", employees });
});

// DELETE - Remove an employee
router.delete("/employees/:id", (req, res) => {
    const id = parseInt(req.params.id);
    employees = employees.filter(emp => emp.id !== id);
    res.json({ message: "Employee deleted", employees });
});

module.exports = router;
