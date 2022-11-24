const express = require("express");
const router = express.Router();

const userController = require("../app/controllers/user.controller");

router.get("/getUser", userController.getUser);

module.exports = router;
