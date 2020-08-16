const sio = require('socket.io');
let io = null;

module.exports.io = () => {
  return io;
};

module.exports.initialize = (server) => {
  return (io = sio(server));
};
