
const io = require('socket.io')(8095);

var state = {};

io.on('connection', socket => {
  console.log('a user connected');

  state[socket.id] = {
    id: socket.id,
  };

  socket.emit('whole state', state);

  socket.on('player state', newPlayerState => {
    newPlayerState.id = socket.id;
    state[socket.id] = newPlayerState;

    socket.broadcast.emit('player state', state[socket.id]);
  })

  socket.on('disconnect', () => {
    console.log('user disconnected');
    state[socket.id] = undefined;
    socket.broadcast.emit('whole state', state);
  });
});
