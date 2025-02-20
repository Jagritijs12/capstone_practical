const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");

const app = express();
const PORT = 7000; // Change this if needed

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: "my_secret_key", // Secret key for session encryption
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 10000 }, // Session expires in 10 seconds
  })
);

// Serve an HTML form for user input
app.get("/", (req, res) => {
  res.send(`
    <h2>Enter Your Details</h2>
    <form action="/store" method="POST">
      <label>Name: <input type="text" name="name" required></label><br><br>
      <label>Age: <input type="number" name="age" required></label><br><br>
      <button type="submit">Submit</button>
    </form>
    <br>
    <form action="/retrieve" method="GET">
      <button type="submit">Retrieve Stored Data</button>
    </form>
    <br>
    <form action="/expire" method="GET">
      <button type="submit">Expire Session</button>
    </form>
  `);
});

// Store user input in session
app.post("/store", (req, res) => {
  req.session.name = req.body.name;
  req.session.age = req.body.age;

  res.send(`
    <h2>Data Stored Successfully!</h2>
    <p><strong>Name:</strong> ${req.session.name}</p>
    <p><strong>Age:</strong> ${req.session.age}</p>
    <br>
    <form action="/retrieve" method="GET">
      <button type="submit">Retrieve Stored Data</button>
    </form>
    <br>
    <form action="/" method="GET">
      <button type="submit">Enter New Data</button>
    </form>
  `);
});

// Retrieve session data
app.get("/retrieve", (req, res) => {
  if (req.session.name && req.session.age) {
    res.send(`
      <h2>Stored Session Data</h2>
      <p><strong>Name:</strong> ${req.session.name}</p>
      <p><strong>Age:</strong> ${req.session.age}</p>
      <p><strong>Session ID:</strong> ${req.session.id}</p>
      <p><strong>Session Timeout:</strong> 10 seconds</p>
      <br>
      <form action="/" method="GET">
        <button type="submit">Enter New Data</button>
      </form>
      <br>
      <form action="/expire" method="GET">
        <button type="submit">Expire Session</button>
      </form>
    `);
  } else {
    res.send(`
      <h2>No session data found!</h2>
      <p>The session may have expired.</p>
      <form action="/" method="GET">
        <button type="submit">Enter New Data</button>
      </form>
    `);
  }
});

// Expire session manually
app.get("/expire", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.send("Error destroying session");
    }
    res.send(`
      <h2>Session Expired!</h2>
      <form action="/" method="GET">
        <button type="submit">Enter New Data</button>
      </form>
    `);
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
