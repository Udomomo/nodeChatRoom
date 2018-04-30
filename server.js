let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/client.js', (req, res) => {
  res.sendFile(__dirname + '/client.js');
});

io.on('connection', (socket) => {
  let name;
  socket.on('new_entry', (name) => {
    socket.broadcast.emit('chat_message', name + ' has joined.');
  });
  
  socket.on('new_message', (data) => {
    name = data.name;
    let msg = data.msg;
    io.emit('chat_message', name + ": " + msg);
  });

  socket.on('disconnect', () => {
    if (name != undefined) {
      io.emit('chat_message', name + " has left.");
    }
  });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});
