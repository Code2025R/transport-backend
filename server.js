const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "transport_db",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed: " + err.stack);
    return;
  }
  console.log("Connected to MySQL database");
});

// Sample Routes
app.get("/", (req, res) => {
  res.send("Transport API is running");
});

// Users API
app.post("/users", (req, res) => {
  const { name, email, password } = req.body;
  const query = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
  db.query(query, [name, email, password], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send({ message: "User registered successfully", userId: result.insertId });
    }
  });
});

// Start Server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
