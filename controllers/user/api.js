const passport = require("passport");
const camelcaseKeys = require("camelcase-keys");
const signIn = require("./controller").signIn;
const getFullProfile = require("./controller").getFullProfile;
const getGithubToken = require("./controller").getGithubToken;
const axios = require("axios");
const GITHUB_CLIENT_ID = require("../../configs/config/credentials")
  .GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = require("../../configs/config/credentials")
  .GITHUB_CLIENT_SECRET;

/**
 * user apis
 */
const userAPI = app => {
  // get authenticated user
  app.get("/api/user/getUser", (req, res) => {
    if (req.user) res.send(req.user);
    else res.send(null);
  });

  // github authentication route
  app.get("/api/user/authViaGitHub", passport.authenticate("github"));

  // github authentication route
  app.post("/api/user/authorization", (req, res) => {
    axios
      .post("https://github.com/login/oauth/access_token", {
        client_id: GITHUB_CLIENT_ID,
        client_secret: GITHUB_CLIENT_SECRET,
        code: req.body.code,
        redirect_uri: "http://localhost:3000/"
      })
      .then(response => {
        res.status(200).send(response);
      })
      .catch(error => {
        console.log(error);
      });
    // getGithubToken(req.body.code)
    //   .then(response => res.status(200).send(response))
    //   .error(error => console.log(error));
  });

  // callback route from github
  app.get(
    // this should match callback url of github app
    "/api/user/authViaGitHub/callback",
    passport.authenticate("github", { failureRedirect: "/signIn/failed" }),
    (req, res) => {
      res.redirect("/");
    }
  );

  // signout the user
  app.get("/api/user/signout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  // get user full profile
  app.get("/api/user/profile/:username", (req, res) => {
    getFullProfile(req.params.username).then(
      result => {
        res.send(result);
      },
      error => {
        res.send({ error });
      }
    );
  });
};

module.exports = userAPI;
