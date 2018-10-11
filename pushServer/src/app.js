var app = require('express')();

var http = require('http').Server(app);

var path = require('path')

var io = require('socket.io')(http)

app.get('/lib/socket.io.js',(req,res)=>{
  res.sendFile(path.join(__dirname,'../lib/socket.io.js'))
})

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'))
});

io.on('connection', (socket) => {
  console.log('a user connected');
  io.emit('toClient', {
    name: 'kimi'
  })
  socket.on('MyFirstSocketEvent', (args) => {
    console.log(args)
  })
})

http.listen(3009, function () {
  console.log('listen on 3009');

})