const express = require("express");
const router = express.Router();
const MessageController = require("../app/controllers/message.controller");

router.post("/newMessage", MessageController.newMessage);
router.get("/:conversationId", MessageController.getMessage);

module.exports = router;
