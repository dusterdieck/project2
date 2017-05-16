// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
const express = require("express"),
	  bodyParser = require("body-parser"),
	  methodOverride = require("method-override"),
	  path = require('path'),
	  db = require("./models"); // Requiring our models for syncing

// Sets up the Express App
// =============================================================
const app = express(),
	  PORT = process.env.PORT || 8679;


// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(path.join(__dirname, "./public")));

// Set Handlebars.
const exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Routes =============================================================

require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);
require("./routes/admin-routes.js")(app);
require("./routes/passport-routes.js")(app);

// Syncing our sequelize models and then starting our express app
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});