// src/server/index.js

// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');
const app = express();

// Middleware: Body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('dist'));


// GET route
app.get('/all', sendData);
function sendData(req, res) {
  res.send(projectData);
}

// POST route
app.post('/add', addData);
function addData(req, res) {
  const newEntry = {
    temp: req.body.temp,
    feel: req.body.feel,
    date: req.body.date
  };
  projectData = newEntry;
  res.send(projectData);
}

// Only start the server if this module is run directly
if (require.main === module) {
  const port = 3000;
  app.listen(port, () => {
    console.log(`server running on localhost: ${port}`);
  });
}

// Export the app for testing
module.exports = app;
