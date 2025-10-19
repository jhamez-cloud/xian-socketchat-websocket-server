const express = require('express');
const http = require('http');
const cors = require('cors');
const {Server} = require('socket.io');

const app = express();
app.use(cors());

const httpserver = http.createServer(app);
const io = new Server(httpserver,{
    cors:{
        origin: 'http://localhost:3000',
        methods: ['GET','POST','PUT','DELETE'],
    }
});

io.on('connection', socket => {
    console.log(`Connected to ${socket.id}`);

    socket.on('join_room', data =>{
        socket.join(data);
    })

    socket.on('send_message',data=>{
        socket.to(data.room).emit('receive_message',data);
    })
})

httpserver.listen(8080,()=>console.log(`Listening on port 8080...`));
