const Conversation = require("../models/conversation.model");
class ConversationController {
  // [POST] /api/conversation/newConversation
  newConversation = async (req, res) => {
    const newConversation = new Conversation({
      members: [
        req.body.user1Id,
        req.body.user2Id,
        req.body.username1,
        req.body.username2,
      ],
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
      console.log("req", req.user);

      const conversation = await Conversation.find({
        members: { $in: [req.user.id] },
      });
      res.status(200).json(conversation);
    } catch (err) {
      res.status(500).json(err);
    }
  };
}

module.exports = new ConversationController();
