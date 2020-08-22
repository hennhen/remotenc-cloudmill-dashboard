const config = require('config');
const axios = require('axios');
const sio = require('socket.io');
const ipSocketMap = require('./ipSocketMap');
let io = null;

module.exports.io = () => {
  return io;
};

module.exports.initialize = (server) => {
  io = sio(server);
  io.on('connection', (socket) => {
    console.log('A socket has connected');
    console.log(Object.keys(io.sockets.sockets));

    ipSocketMap[socket.id] = socket.id;

    socket.on('rtc', (data) => {
      if (config.dev.webrtc) return;
      // TODO: Determine server IP based on socket ID (fetch socket ID through data.socketID)
      axios.post('http://localhost:4000', data);
    });

    socket.on('disconnect', () => {
      const socketIDs = Object.keys(io.sockets.sockets);

      console.log('A socket has disconnected');
      for (const [ip, socketID] of Object.entries(ipSocketMap)) {
        if (!socketIDs.includes(socketID)) {
          delete ipSocketMap[ip];
        }
      }
      console.log(socketIDs);
    });
  });
  return io;
};
