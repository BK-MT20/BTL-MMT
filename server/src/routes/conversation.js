const express = require("express");
const router = express.Router();
const ConversationController = require("../app/controllers/conversation.controller");

router.post("/newConversation", ConversationController.newConversation);
router.get("/:userId", ConversationController.getConversations);

module.exports = router;
