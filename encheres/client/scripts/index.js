const socket = io();

socket.on('ping', () => {
  console.log('ping received for index.js');
  socket.emit('pong');
});
