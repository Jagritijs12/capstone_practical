const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const employeeRoutes = require("./routes/employees");

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use("/api", employeeRoutes);

const PORT = 6000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
