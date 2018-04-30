$(function () {
  var socket = io();
  var newEntry = true;
  var name = ''
  
  $('form').submit(function(){
    if (newEntry){
      socket.emit('new_entry', $('#m').val());
      name = $('#m').val();
      changeLabel();
    }else{
      socket.emit('new_message', $('#m').val());
    }

    $('#m').val('');
    return false;
  });

  function changeLabel() {
    $("label").text("Message");
    $("button").text("Send");
    newEntry = false;
  }

  socket.on('chat_message', function(msg){
    $('#messages').append($('<li>').text(msg));
  });
});