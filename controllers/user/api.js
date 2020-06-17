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
import { generateJWTToken, verifyToken } from "../../utilities/authUtils";

/**
 * user apis
 */
const userAPI = app => {
  // get authenticated user
  app.get("/api/user", async (req, res) => {
    try {
      let verifYToken = await verifyToken(
        req.headers.authorization.split(" ")[1]
      );
      if (verifYToken.isExpired) {
        axios
          .get("https://api.github.com/user", {
            headers: { Authorization: `token ${verifYToken.access_token}` }
          })
          .then(response => {
            res.json(response.data);
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        res.stats(401).send("Unauthorize");
      }
    } catch (error) {
      res.json(error);
    }
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
      .then(async response => {
        let acces_token = response.data.split("&")[0].split("=")[1];
        let jwt_token = await generateJWTToken({ acces_token: acces_token });
        console.log("###################", jwt_token);
        res.json({ jwt_token });
      })
      .catch(error => {
        console.log(error);
      });
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
