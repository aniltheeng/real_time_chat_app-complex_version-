const express = require('express')
const app = express()
const http = require('http')
const socketIo = require('socket.io')
const cors = require('cors')

const server = http.createServer(app)
app.use(cors())

const PORT = 4500 || process.env.PORT
const users = [{}]

app.get('/',(req,res)=>{
    res.end(`<h1>Ye It's working now.</h1>`)
})

const io = socketIo(server)

io.on('connection',(socket)=>{
    console.log('connected')
    socket.on('joined',({user})=>{
        users[socket.id] = user
        socket.emit('welcome',{user:"Admin",message:`welcome to the chat,${users[socket.id]}`})
        socket.broadcast.emit('new-user',{user:"Admin",message:`${users[socket.id]} has joined`})
    })

    socket.on('chat-message',({message,id})=>{
        io.emit('send-message',{user:users[id],message,id})
    })

    socket.on('disconnect',()=>{
        socket.broadcast.emit('leave',{user:"Admin",message:`${users[socket.id]}  has left`});
      console.log(`user left`);
  })
})

server.listen(PORT,()=>{
    console.log(`server is working at port:http://localhost:${PORT}`)
})
