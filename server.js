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
  let username;
  socket.on('new_entry', (name) => {
    username = name;
    socket.broadcast.emit('chat_message', username + ' has joined.');
  });
  
  socket.on('new_message', (msg) => {
    io.emit('chat_message', username + ": " + msg);
  });

  socket.on('disconnect', () => {
    if (username != undefined) {
      io.emit('chat_message', username + " has left.");
    }
  });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});
