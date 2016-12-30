
const state = {};
const localPlayer = {x: 100, y: 100};

const socket = io();

socket.on('whole state', newState => {
  _.assignIn(state, newState);
});

socket.on('player state', newPlayerState => {
  state[newPlayerState.id] = newPlayerState;
});

const canvas = document.createElement('canvas');
canvas.width = 640;
canvas.height = 360;
const ctx = canvas.getContext('2d');
document.body.prependChild(canvas);

function drawPlayer(ctx, player) {
  ctx.fillStyle = "rgb(200,0,0)";
  ctx.fillRect(player.x, player.y, 20, 30);
};

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  _.map(state, player => drawPlayer(ctx, player));

  requestAnimationFrame(draw);
};
draw();

const keyCodes = {left: 37, up: 38, right: 39, down: 40};
var pressed = [];
document.addEventListener('keydown', event => {
  pressed = _.union(pressed, [event.keyCode]);
});
document.addEventListener('keyup', event => {
  pressed = _.difference(pressed, [event.keyCode]);
});

setInterval(() => {
  localPlayer.x += pressed[keycodes.right] ? 1 : 0 - pressed[keyCodes.left] ? 1 : 0
  localPlayer.y += pressed[keycodes.down] ? 1 : 0 - pressed[keyCodes.up] ? 1 : 0
  localPlayer.x = Math.min(canvas.width, Math.max(0, localPlayer.x));
  localPlayer.y = Math.min(canvas.height, Math.max(0, localPlayer.y));
  socket.emit('player state', localPlayer);
}, 100);
