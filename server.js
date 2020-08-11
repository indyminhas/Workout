const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
require('dotenv').config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workoutTrackerDB", { 
  useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true 
});

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 7200000
  }
}))

// routes
app.use(require("./routes/route"));

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });