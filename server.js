var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/client.js', function(req, res){
  res.sendFile(__dirname + '/client.js');
});

io.on('connection', function(socket){
  socket.on('new entry', function(name){
    socket.broadcast.emit('chat message', name + ' has joined.');
  });
  
  socket.on('new message', function(data){
    var name = data.name;
    var msg = data.msg;
    io.emit('chat message', name + ": " + msg);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
