
const io = require('socket.io')(8095);

var state = {};

io.on('connection', socket => {
  console.log('a user connected');

  state[socket.id] = {
    id: socket.id,
  };

  socket.emit('whole state', state);

  socket.on('player state', newPlayerState => {
    state[socket.id] = {
      ...newPlayerState,
      id: socket.id
    };

    socket.broadcast.emit('player state', state[socket.id]);
  })

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});
