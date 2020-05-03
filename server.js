// modules for server
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");

// server configurations
const serverConfigs = require("./configs/config/config");

// connect to database
mongoose
  .connect(serverConfigs.DBURL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  .then(() => console.log("Connected to Database"))
  .catch(error => console.log(error));

// initialize express
const app = express();

// apply express configs
require("./configs/express")(app, serverConfigs);

// fire up the server
app.listen(serverConfigs.PORT, error => {
  if (error) throw error;
  console.log("Server running on port: " + serverConfigs.PORT);
});
