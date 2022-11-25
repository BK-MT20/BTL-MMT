const express = require("express");
const router = express.Router();
const authJWT = require("../app/middleware/authJWT");

const userController = require("../app/controllers/user.controller");

router.get("/getUser", authJWT.verifyToken, userController.getUser);

module.exports = router;
