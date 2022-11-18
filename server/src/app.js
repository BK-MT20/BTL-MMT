require('dotenv').config()
const express = require('express')
const http = require('http')
const { Server } = require('socket.io')
const p2p = require('socket.io-p2p-server').Server

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
    cors: 'http://localhost:3000'
})
io.use(p2p)

require('./routes')(app)

server.listen(process.env.PORT, err => {
    if(err) {
        console.log(err)
        return
    }
    console.log('Server is running at PORT: ', process.env.PORT)
})