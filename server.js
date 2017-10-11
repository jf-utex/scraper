// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var request = require("request");
var cheerio = require("cheerio");
var mongojs = require("mongojs");

var article = require("./models/article.js");
var save = require("./models/notes.js");

// set mongoose promise
mongoose.Promise = Promise;

// Initialize Express
var app = express();

app.use(logger("dev"));

app.use(bodyParser.urlencoded({
  extended: false
}));

var PORT = process.env.PORT || 3000;

// Configure the public static directory
app.use(express.static("public"));

//establish connection the the db
// Database configuration
var databaseUrl = "articlesdb";
var collections = ["articledata"];

mongoose.connect("mongodb://localhost:/articlesdb");
var db = mongoose.connection;

// log any error with mongoose
db.on("error", function(error) {
  console.log(error);
});

db.once("open", function() {
    console.log("Mongoose Connection is Successful!")


// Routes:
//========

require("./routes/html-routes.js")(app);
require("./routes/app-routes.js")(app);

app.listen(PORT, function() {
console.log("Application is listening on port: " + PORT);
});
});
