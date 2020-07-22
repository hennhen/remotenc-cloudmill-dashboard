const dgram = require('dgram');

const _UDP_PORT = require('config').udp_stream_receive_port;

module.exports = class UDPReceiver {
  // Passed in an httpServer to be reused with socket.io
  constructor(server, socketServer, ip_socket_map, users) {
    // ============= UDP setups ============
    var udpServer = dgram.createSocket('udp4');

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

      // udpServer.on("message", (msg, rinfo) => {
      //    console.log(
      //       `server got: ${msg} from ${rinfo.address}:${rinfo.port}`
      //    );
      //    socketClient.emit("udpData", msg.toString());
      // });

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
      console.log(ip_socket_map);
      console.log(`Got: ${msg} from ${rinfo.address}:${rinfo.port}`);
      console.log(`Should goto socket: ${ip_socket_map[rinfo.address]}`);
      socketServer
        .to(ip_socket_map[rinfo.address])
        .emit('udpData', msg.toString());
    });
  }
};
