const Conversation = require("../models/conversation.model");

class ConversationController {
  // [POST] /api/conversation/newConversation
  newConversation = async (req, res) => {
    const newConversation = new Conversation({
      members: [req.body.senderId, req.body.receiverId],
    });
    try {
      const savedConversation = await newConversation.save();
      res.status(200).json(savedConversation);
    } catch (err) {
      res.status(500).json(err);
    }
  };
  // [GET] /api/conversation/:userId

  getConversations = async (req, res) => {
    try {
      const conversation = await Conversation.find({
        members: { $in: [req.params.userId] },
      });
      res.status(200).json(conversation);
    } catch (err) {
      res.status(500).json(err);
    }
  };
}

module.exports = new ConversationController();
