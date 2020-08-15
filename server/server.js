const config = require('config');
const path = require('path');
//============== Express Stuff =================
const express = require('express');
const app = express();
const connectDB = require('./db');

// Connect Database
connectDB();

const PORT = process.env.POPRT || config.expressServerPort;

const httpServer = app.listen(PORT, () => {
  console.log('Express started on PORT: ', PORT);
});

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

// Init Middleware
app.use(express.json());
app.use(require('cors')());

//================== EXPRESS ROUTES ===================
// app.get('/discover', (req, res) => {
//   const socketID = req.query.socketID;
//   udpDiscover((machineData) => {
//     // TODO: If success then send back res: 200
//     io.to(socketID).emit('machine_data', machineData);
//   });
// });

// Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));

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

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('dist'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
  });
}
