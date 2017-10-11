// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the HTML
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {

  // saved route loads saved.html
  app.get("/saved", function(req, res) {
    res.sendFile(path.join(__dirname + "/../public/saved.html"));
  });
};
