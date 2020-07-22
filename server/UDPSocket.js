const dgram = require('dgram');
const _UDP_PORT = require('config').udpStreamReceivePort;

// Passed in an httpServer to be reused with socket.io
const UDPReceiver = (server, socketServer, ipSocketMap, users) => {
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

  socketServer.on('connection', (socket) => {
    console.log('Socket client connected');
    console.log('List of clients: ');
    console.log(Object.keys(socketServer.sockets.sockets));

    if (!users[socket.id]) {
      users[socket.id] = socket.id;
    }
    socket.on('disconnect', () => {
      delete users[socket.id];
    });

    socket.on('callUser', (data) => {
      socketServer.to(data.userToCall).emit('hey', {
        signal: data.signalData,
        from: data.from
      });
    });

    socket.on('acceptCall', (data) => {
      socketServer.to(data.to).emit('callAccepted', data.signal);
    });

    socket.on('webrtc', () => {
      socketServer.sockets.emit('allUsers', users);
    });
  });

  socketServer.on('disconnect', () => {
    console.log('A socket is disconnected');
  });

  // Emit to specific socket with our dict map
  udpServer.on('message', (msg, rinfo) => {
    console.log(ipSocketMap);
    console.log(`Got: ${msg} from ${rinfo.address}:${rinfo.port}`);
    console.log(`Should goto socket: ${ipSocketMap[rinfo.address]}`);
    socketServer.to(ipSocketMap[rinfo.address]).emit('udpData', msg.toString());
  });
};

module.exports = UDPReceiver;
