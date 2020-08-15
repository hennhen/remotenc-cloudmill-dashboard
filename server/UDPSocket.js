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

    // DEV
    if (config.dev.mach3) {
      const sendGCodeIdx = (idx) => {
        socket.emit('gcode', idx);
        setTimeout(() => {
          sendGCodeIdx(idx + 1);
        }, 2000);
      };
      setTimeout(() => {
        sendGCodeIdx(0);
      }, 2000);
    }

    socket.on('video', (data) => {
      if (config.dev.webrtc) return;
      // TODO: Determine server IP based on socket ID (fetch socket ID through data.socketID)
      axios.post('http://d4f5639563bf.ngrok.io', data);
    });

    socket.on('disconnect', () => {
      console.log('A socket has disconnected');
      for (const [ip, socketID] in Object.entries(ipSocketMap)) {
        if (socketID === socket.id) {
          delete ipSocketMap[ip];
        }
      }
      console.log(ipSocketMap);
    });
  });

  // Emit to specific socket with our dict map
  udpServer.on('message', (msg, rinfo) => {
    console.log(ipSocketMap);
    console.log(`Got: ${msg} from ${rinfo.address}:${rinfo.port}`);
    console.log(`Should goto socket: ${ipSocketMap[rinfo.address]}`);
    io.to(ipSocketMap[rinfo.address]).emit('udpData', msg.toString());
  });

  // TODO: Have mach3 client emit current line of gcode
};

module.exports = UDPReceiver;
