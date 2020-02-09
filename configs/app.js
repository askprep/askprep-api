/*********
 * app.js file
 *********/
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

const App = (() => {
  let server = express(),
    create,
    start;

  create = (config, db) => {
    let routes = require("../routes");
    // set all the server things
    console.log(config, db);
    server.set("env", config.env);
    server.set("port", config.default.port);
    server.set("hostname", config.default.hostname);

    // add middleware to parse the json
    server.use(bodyParser.json());
    server.use(
      bodyParser.urlencoded({
        extended: false
      })
    );

    //connect the database
    mongoose.connect(db.database, {
      useNewUrlParser: true,
      useCreateIndex: true
    });

    // Set up routes
    routes.init(server);
  };

  start = () => {
    let hostname = server.get("hostname"),
      port = server.get("port");
    server.listen(port, function() {
      console.log(
        "Express server listening on - http://" + hostname + ":" + port
      );
    });
  };
  return {
    create: create,
    start: start
  };
})();

export default App;
