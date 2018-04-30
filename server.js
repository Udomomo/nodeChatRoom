let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/client.js', function(req, res){
  res.sendFile(__dirname + '/client.js');
});

io.on('connection', function(socket){
  socket.on('new_entry', function(name){
  let name;
    socket.broadcast.emit('chat_message', name + ' has joined.');
  });
  
  socket.on('new_message', function(data){
    name = data.name;
    let msg = data.msg;
    io.emit('chat_message', name + ": " + msg);
  });

  socket.on('disconnect', function(){
    if (name != undefined) {
      io.emit('chat_message', name + " has left.");
    }
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
