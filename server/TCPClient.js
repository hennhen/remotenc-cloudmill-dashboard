// This class will be responsible of sending and recieving TCP requests
// Each connection should have its own TCP client
'use strict';

const net = require('net');
const config = require('config');

module.exports = class TCPClient {
  constructor() {
    this.server = net.createServer();
    this.server.on('connection', this._handleConnection);
    this.server.listen(config.tcpPort, () => {
      console.log('TCP Server bound to port: ', config.tcpPort);
    });
  }

  _handleConnection(conn) {
    const remoteAddress = conn.remoteAddress + ':' + conn.remotePort;
    console.log('TCP: new client connection from %s', remoteAddress);

    const onConnData = (d) => {
      // TODO: Handle incoming TCP data
      console.log('TCP: connection data from %s: %j', remoteAddress, d);
      conn.write(d);
    };

    const onConnClose = () => {
      console.log('TCP: connection from %s closed', remoteAddress);
    };

    const onConnError = (err) => {
      console.log('TCP: Connection %s error: %s', remoteAddress, err.message);
    };

    conn.on('data', onConnData);
    conn.once('close', onConnClose);
    conn.on('error', onConnError);
  }

  sendAuthRequest(data, cb) {
    data = Object.assign(
      {
        type: 'auth_request',
        auth_udp_port: config.udpStreamReceivePort
      },
      data
    );
    this.sendTCPPacket(data, cb);
  }

  sendDisconnectRequest(data, cb) {
    data = Object.assign(
      {
        type: 'disconnect_request'
      },
      data
    );
    this.sendTCPPacket(data, cb);
  }

  sendCommand(data, cb) {
    data = Object.assign(
      {
        type: 'mach3_command'
      },
      data
    );
    this.sendTCPPacket(data, cb);
  }

  // Esbalish request,
  sendTCPPacket(data, cb) {
    console.log('sendTCPPacket(): Sending: %s', data);
    // Create new client for the outgoing request, destroy when done
    const client = new net.Socket();

    // Receive response from the Mach3 computer after sending out
    client.on('data', (data) => {
      client.destroy();
      cb(data);
    });

    client.setTimeout(3000, () => {
      console.log(
        'TCP Send Auth Request: Connection Timeout. Check if the target Endpoing is correct'
      );
      client.destroy();
    });

    client.on('close', () => {
      console.log('Connection Closed');
    });

    try {
      client.connect(data.targetPort, data.targetIP, () => {
        console.log(
          `TCP Auth Request: Connected to ${data.targetIP}:${data.targetPort}`
        );
        client.write(JSON.stringify(data));
      });
    } catch (e) {
      console.log(e);
      console.log('Probably wrong endpoint or endpoint is incorrect');
      client.destroy();
    }
  }
};
