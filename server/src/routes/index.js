const userRouter = require("./user");
const authRouter = require("./auth");
const conversationRouter = require("./conversation");
const messageRouter = require("./message");
function route(app) {
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  app.use("/api", userRouter);
  app.use("/api/auth", authRouter);
  app.use("/api/conversation", conversationRouter);
  app.use("/api/message", messageRouter);
}

module.exports = route;
