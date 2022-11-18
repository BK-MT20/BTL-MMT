require('dotenv').config()
const express = require('express')
const http = require('http')
const { Server } = require('socket.io')
const p2p = require('socket.io-p2p-server').Server
const cookieParser = require('cookie-parser')
const app = express()
const server = http.createServer(app)
const bodyParser = require('body-parser')

const io = new Server(server, {
    cors: 'http://localhost:3000'
})
io.use(p2p)
app.use(bodyParser.json())
app.use(cookieParser())
app.use(express.json())

require('./routes')(app)
require('./config/db/index').connect()

server.listen(process.env.PORT, err => {
    if(err) {
        console.log(err)
        return
    }
    console.log('Server is running at PORT: ', process.env.PORT)
})