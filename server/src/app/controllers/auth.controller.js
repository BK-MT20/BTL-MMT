const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

class AuthController {
  //[POST] api/auth/signup
  signup = (req, res) => {
    try {
      const hashed = bcrypt.hashSync(req.body.password, 10);
      const newUser = new User({
        username: req.body.username,
        name: req.body.name,
        password: hashed,
      });

      newUser.save((err, user) => {
        if (err) {
          console.log(newUser);

          res.status(500).send({ message: err });
          return;
        }

        res
          .status(200)
          .send({ message: "User was registered successfully!", user });
      });
    } catch (err) {
      res.status(500).json(err);
    }
  };
  //[POST] api/auth/signin

  signin = async (req, res) => {
    try {
      const user = await User.findOne({
        username: req.body.username,
      });
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      //   console.log(user.password, req.body.password);
      var validPassword = await bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!validPassword) {
        return res.status(404).send({
          accessToken: null,
          message: "Invalid password!",
        });
      }
      if (user && validPassword) {
        var accessToken = jwt.sign(
          { id: user.id },
          process.env.ACCESS_SECRET_KEY,
          {
            expiresIn: `${process.env.ACCESS_TOKEN_EXPIRESIN}m`,
          }
        );

        var refreshToken = jwt.sign(
          { id: user.id },
          process.env.REFRESH_SECRET_KEY,
          {
            expiresIn: `${process.env.REFRESH_TOKEN_EXPIRESIN}m`,
          }
        );
        res
          .status(202)
          .cookie("act", accessToken, {
            httpOnly: true,
            sameSite: "strict",
            secure: false,
            path: "/",
            maxAge: process.env.REFRESH_TOKEN_EXPIRESIN * 1000 * 60,
          })
          .cookie("rft", refreshToken, {
            httpOnly: true,
            sameSite: "strict",
            secure: false,
            path: "/",
            maxAge: process.env.REFRESH_TOKEN_EXPIRESIN * 1000 * 60,
          })
          .send({
            id: user.id,
            accessToken: accessToken,
            expiresIn: process.env.ACCESS_TOKEN_EXPIRESIN + "m",
          });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  };
  // [POST] api/auth/signout
  signout = (req, res) => {
    res.clearCookie("rft");
    res.clearCookie("act");
    res.status(200).json("Loggout successfully !");
  };

  //[POST] api/auth/refreshToken

  requestRefreshToken = (req, res) => {
    const refreshToken = req.cookies?.rft;
    if (!refreshToken) return res.status(401).json("You are not authenticated");
    jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY, (err, user) => {
      if (err) {
        console.log(err);
        return;
      }
      //Create new accessToken,refreshToken
      var newAccessToken = jwt.sign(
        { id: user.id },
        process.env.ACCESS_SECRET_KEY,
        {
          expiresIn: `${process.env.ACCESS_TOKEN_EXPIRESIN}m`,
        }
      );

      var newRefreshToken = jwt.sign(
        { id: user.id },
        process.env.REFRESH_SECRET_KEY,
        {
          expiresIn: `${process.env.REFRESH_TOKEN_EXPIRESIN}m`,
        }
      );
      res
        .status(202)
        .cookie("act", accessToken, {
          httpOnly: true,
          sameSite: "strict",
          secure: false,
          path: "/",
          maxAge: process.env.ACCESS_TOKEN_EXPIRESIN * 1000,
        })
        .cookie("rft", newRefreshToken, {
          httpOnly: true,
          sameSite: "strict",
          secure: false,
          path: "/",
          maxAge: process.env.ACCESS_TOKEN_EXPIRESIN * 1000,
        })
        .send({
          accessToken: newAccessToken,
          expiresIn: process.env.ACCESS_TOKEN_EXPIRESIN + "m",
        });
    });
  };
}

module.exports = new AuthController();
