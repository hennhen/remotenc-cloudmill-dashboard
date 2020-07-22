const dgram = require('dgram');

const UDPDiscover = (cb) => {
  const udpServer = dgram.createSocket('udp4');

  udpServer.on('error', (err) => {
    console.log(`server error:\n${err.stack}`);
    udpServer.close();
  });

  udpServer.on('listening', () => {
    const address = udpServer.address();
    console.log(`UDP server listening ${address.address}:${address.port}`);
  });

  udpServer.on('message', (msg) => {
    console.log(`UDPBroadcast Got: ${msg}`);
    // Callback function to send machine data to the socket
    cb(msg);
  });

  udpServer.bind();

  udpServer.setBroadcast(true);
  udpServer.send('BROADCAST', 56189, '255.255.255.255');
};

module.exports = UDPDiscover;
