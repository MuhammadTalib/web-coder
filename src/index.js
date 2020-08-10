const express = require('express')
require('./db/moongoose')
const userRouter = require('./routers/users')
const codeRouter = require('./routers/codeshare')
const bodyParser = require('body-parser')
const http = require('http');
const cors = require("cors")
var socket = require('socket.io');
var path = require('path');

const { getRooms, addRoom, deleteRooms } = require('./socketio-utils')

const app=express()
const port = process.env.PORT || process.env.port || 8000
app.use(cors({credentials: true}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Headers",  req.headers['access-control-request-headers']);
    next();
});



app.use(express.json())
app.use(userRouter)
app.use(codeRouter)

app.use(express.static(path.join(__dirname, 'build')));


app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

var server = app.listen(port,()=>{
    console.log('Web Coder Backend is working on port',port)
})


let io = socket(server)

io.on("connection", function(client) {

  client.on('join', (room)=>{  
    client.join(room)
    console.log("room jloin",room)
  });

  client.on('roomcreated',async function(room){
    console.log("rrom",room)
    await addRoom(room);
  });

  client.on('changecode',async function(req){
    client.broadcast.to(req.room).emit('changecode',req.code)
  });

  client.on("onroomleave", (room)=> {
    console.log("room",room)
    client.leave(room)
  });

  client.on('stream',(req)=>{
    io.to(req.room).emit('stream',req.stream)
  });

});