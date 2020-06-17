import jwt from "jsonwebtoken";
import config from "../configs/config/credentials";

export const generateJWTToken = userData => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      userData,
      "ASK_PREP_JWT_SECRET",
      { expiresIn: "7d" },
      (err, token) => {
        console.log("Error:", err);
        console.log("Token:", token);
        return token ? resolve(token) : reject(err);
      }
    );
  });
};
export const verifyToken = jwtToken => {
  return new Promise((resolve, reject) => {
    try {
      let decoded = jwt.verify(jwtToken, "ASK_PREP_JWT_SECRET");
      if (decoded) {
        var current_time = Date.now() / 1000;
        if (decoded.exp < current_time) {
          reject({ access_token: "", isValid: false });
        }
        return resolve({ access_token: decoded.access_token, isExpired: true });
      } else {
        reject(err);
      }
    } catch (err) {
      return reject({ access_token: "", isExpired: false });
    }
  });
};
