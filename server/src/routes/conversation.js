const express = require("express");
const router = express.Router();
const ConversationController = require("../app/controllers/conversation.controller");
const authJWT = require("../app/middleware/authJWT");

router.post(
  "/newConversation",
  authJWT.verifyToken,
  ConversationController.newConversation
);
router.get(
  "/:userId",
  authJWT.verifyToken,
  ConversationController.getConversations
);

module.exports = router;
