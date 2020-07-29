const config = require('config');
//============== Express Stuff =================
const path = require('path');
const express = require('express');
const app = express();

const httpServer = app.listen(
  config.expressServerPort,
  config.localIP || 'localhost',
  () => {
    console.log('Express started on PORT: ', config.expressServerPort);
  }
);

//===============Redis==================
// const redis = require("redis");
// const _portRedis = config.portRedis;
// const redis_client = redis.createClient(_portRedis);

//============Dict==========
const ipSocketMap = {};
//===============Socekts (UDP/TCP)===============
const io = require('socket.io')();
const udpSocket = require('./UDPSocket');
// const UDPBroadcast = require('./UDPBroadcast');
const TCP = require('./TCPClient'); // Instantiates and start TCP server
const tcp = new TCP();

io.listen(httpServer);

// Pass in the httpServer object to be reused for socket.io
udpSocket(httpServer, io, ipSocketMap);

//=====================

app.use(express.json());
app.use(require('cors')());
app.use(express.static(path.join(__dirname, 'build')));

//================== EXPRESS ROUTES ===================
// app.get('/discover', (req, res) => {
//   const socketID = req.query.socketID;
//   udpDiscover((machineData) => {
//     // TODO: If success then send back res: 200
//     io.to(socketID).emit('machine_data', machineData);
//   });
// });

app.post('/auth', (req, res) => {
  console.log(req.body);

  // DEV
  if (config.dev.mach3) {
    return res.status(200).end();
  }

  tcp.sendAuthRequest(req.body, (result) => {
    //TODO: Directly get result's status code into the status code
    const JSONresult = JSON.parse(result);
    console.log(JSONresult);

    if (JSONresult.status == 200) {
      // Auth Success
      console.log('Login Sucess');
      console.log(req.body.targetIP, req.body.socketID);
      ipSocketMap[req.body.targetIP] = req.body.socketID;
    } else {
      // Auth Failure
      console.log('Login Failed. Incorrect Password');
    }

    res.statusCode = JSONresult.status;
    res.end(result);
  });
});

app.post('/disconnect', (req, res) => {
  tcp.sendDisconnectRequest(req.body, (result) => {
    res.end(result);
  });
});

app.post('/command', (req, res) => {
  tcp.sendCommand(req.body, (result) => {
    res.end(result);
  });
});

app.post('/video', (req, res) => {
  const {
    body: { socketID, signal }
  } = req;

  io.to(socketID).emit('video', signal);
  res.status(200).end();
});
