$(function () {
  var socket = io();
  var newEntry = true;
  var name = ''
  
  $('form').submit(function(){
    if (newEntry){
      socket.emit('new entry', $('#m').val());
      name = $('#m').val();
      changeLabel();
    }else{
      socket.emit('new message', {"name": name, "msg": $('#m').val()});
    }

    $('#m').val('');
    return false;
  });

  function changeLabel() {
    $("label").text("Message");
    $("button").text("Send");
    newEntry = false;
  }

  socket.on('chat message', function(msg){
    $('#messages').append($('<li>').text(msg));
  });
});