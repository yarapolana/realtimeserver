const express = require('express')
const http = require('http')
const path = require('path')
const socketIo = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketIo(server)

// use json
app.use(express.json())

// use html
app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'public'))
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')

// define socket io global middleware
app.use((req, res, next) => {
  req.io = io
  next()
})

app.get('/', (req, res) => {
  res.render('index.html');
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
