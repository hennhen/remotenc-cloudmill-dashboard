const dgram = require('dgram');
const _UDP_PORT = require('config').udpStreamReceivePort;
const axios = require('axios');

// Passed in an httpServer to be reused with socket.io
const UDPReceiver = (server, io, ipSocketMap) => {
  // ============= UDP setups ============
  const udpServer = dgram.createSocket('udp4');

  udpServer.on('error', (err) => {
    console.log(`server error:\n${err.stack}`);
    server.close();
  });

  udpServer.on('listening', () => {
    const address = udpServer.address();
    console.log(`UDP server listening ${address.address}:${address.port}`);
  });

  udpServer.bind(_UDP_PORT);

  // ============= Sockets ==============

  io.on('connection', (socket) => {
    console.log('Socket client connected');
    console.log('List of clients: ');
    console.log(Object.keys(io.sockets.sockets));

    socket.on('video', (data) => {
      axios.post('http://localhost:4000', data);
    });
  });

  io.on('disconnect', () => {
    console.log('A socket is disconnected');
  });

  // Emit to specific socket with our dict map
  udpServer.on('message', (msg, rinfo) => {
    console.log(ipSocketMap);
    console.log(`Got: ${msg} from ${rinfo.address}:${rinfo.port}`);
    console.log(`Should goto socket: ${ipSocketMap[rinfo.address]}`);
    io.to(ipSocketMap[rinfo.address]).emit('udpData', msg.toString());
  });
};

module.exports = UDPReceiver;
