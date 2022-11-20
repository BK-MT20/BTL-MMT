const userRouter = require("./user");
const authRouter = require("./auth");
const conversationRouter = require("./conversation");
const messageRouter = require("./message");
function route(app) {
  app.use("/user", userRouter);
  app.use("/api/auth", authRouter);
  app.use("/api/conversation", conversationRouter);
  app.use("/api/message", messageRouter);
}

module.exports = route;
