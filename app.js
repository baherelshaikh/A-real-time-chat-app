const express = require('express')
const app = express()
const http = require('http')
const { Server } = require('socket.io')



const server = http.createServer(app)
const io = new Server(server)

app.use(express.static('public'))

io.on('connection', (client)=>{
    console.log(`Client with id: ${client.id} is connected`)

    
    // client.emit('message', "data sending to the client")
    
    client.on('chat message',(message)=>{
        const data ={
            message: message,
            Id: client.id
        }
        io.emit('chat message', data)
    })

    client.on('disconnect', ()=>{
        console.log(`Client with id: ${client.id} is disconnected`)
    })
})



const Port = 3000
server.listen(Port, ()=>{
    console.log(`server is on port ${Port} ...`)
})