const express = require('express')
const http = require('http')
const socketIo = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketIo(server)

app.use(express.json())

app.use((req, res, next) => {
  req.io = io
  next()
})

app.get('/', (req, res) => {
  // res.send('Comé mundo');
  res.sendFile(__dirname + '/index.html');
})

io.on('connection', (socket) => {
  console.log('um usuário conectou-se')
  socket.on('disconnect', () => {
    console.log('usuário desconectou-se')
  })

  socket.on('chatar', (msg) => {
    console.log('message: ' + msg)
    io.emit('chatar', msg)
  })
})

server.listen(3333, () => {
  console.log(`escutando a porta: 3333`)
})
