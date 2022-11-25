const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const verifyToken = (req, res, next) => {
  let accessToken = req.cookies?.act;

  if (!accessToken) {
    return res.status(401).send({ message: "Unauthorized!" });
  }

  jwt.verify(accessToken, process.env.ACCESS_SECRET_KEY, (err, decoded) => {
    if (err || !decoded?.id) {
      let refreshToken = req.cookies?.rft;
      if (!refreshToken) {
        return res.status(401).send({ message: "Unauthorized!", error: err });
      }

      jwt.verify(
        refreshToken,
        process.env.REFRESH_SECRET_KEY,
        (err, decoded) => {
          if (err || !decoded?.id) {
            return res
              .status(401)
              .send({ message: "Unauthorized!", error: err });
          }

          var accessToken = jwt.sign(
            { id: decoded.id },
            process.env.ACCESS_SECRET_KEY,
            {
              expiresIn: `${process.env.ACCESS_TOKEN_EXPIRESIN}m`,
            }
          );

          res.cookie("act", accessToken, {
            httpOnly: true,
            sameSite: "strict",
            secure: true,
            path: "/",
            maxAge: process.env.REFRESH_TOKEN_EXPIRESIN * 1000 * 60,
          });
          req.user = decoded;
          next();
        }
      );
      return;
    }
    req.user = decoded;
    next();
  });
};

const checkDuplicateUsername = (req, res, next) => {
  User.findOne({
    username: req.body.username,
  }).exec((err, user) => {
    if (err) {
      res
        .status(500)
        .send({ message: `checkDuplicateUsernameOrEmail: username ${err}` });
      return;
    }
    if (user) {
      res.status(400).send({ message: "Failed! Username already in use!" });
      return;
    }
    next();
  });
};

const authJWT = {
  verifyToken,
  checkDuplicateUsername,
};
module.exports = authJWT;
