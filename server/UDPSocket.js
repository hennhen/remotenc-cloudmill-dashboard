const dgram = require('dgram');
const config = require('config');
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

  udpServer.bind(config.udpStreamReceivePort);

  // ============= Sockets ==============

  io.on('connection', (socket) => {
    console.log('Socket client connected');
    console.log('List of clients: ');
    console.log(Object.keys(io.sockets.sockets));

    socket.on('video', (data) => {
      if (config.dev) return;
      // TODO: Determine server IP based on socket ID (fetch socket ID through data.socketID)
      axios.post('http://9a261c053851.ngrok.io', data);
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
