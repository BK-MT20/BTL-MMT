const express = require("express");
const router = express.Router();
const MessageController = require("../app/controllers/message.controller");
const authJWT = require("../app/middleware/authJWT");

router.post("/newMessage", authJWT.verifyToken, MessageController.newMessage);
router.get(
  "/:conversationId",
  authJWT.verifyToken,
  MessageController.getMessage
);

module.exports = router;
