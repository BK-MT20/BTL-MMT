require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const p2p = require("socket.io-p2p-server").Server;
const cookieParser = require("cookie-parser");
const app = express();
const server = http.createServer(app);
const bodyParser = require("body-parser");
const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
const io = new Server(server, {
  cors: "http://localhost:3000",
  maxHttpBufferSize: 1e8
});
// io.use(p2p);
const Message = require('../src/app/models/message.model')

io.on("connection", (socket) => {
  console.log("a user is connected.");

  socket.on('peer-msg', async function (data) {
    console.log('peer-msg', data);
    socket.broadcast.emit('peer-msg', data);
  })

  socket.on('peer-files', async function (data) {
    console.log('peer-files', data);
    
    const message = await Message.findOne({ _id: data.id }).exec();
    message.files = data.files;
    await message.save();
    socket.broadcast.emit('peer-files', data);
  })
});

app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());

require("./routes")(app);
require("./config/db/index").connect();

server.listen(process.env.PORT, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("Server is running at PORT: ", process.env.PORT);
});
