const config = require('config');
const path = require('path');
//============== Express Stuff =================
const express = require('express');
const app = express();
const connectDB = require('./db');

// Connect Database
connectDB();

const PORT = process.env.PORT || config.expressServerPort;

const server = app.listen(PORT, () => {
  console.log('Express started on PORT: ', PORT);
});

//===============Redis==================
// const redis = require("redis");
// const _portRedis = config.portRedis;
// const redis_client = redis.createClient(_portRedis);

//===============Socekts (UDP/TCP)===============
require('./io').initialize(server);
require('./udp')(server);
// const UDPBroadcast = require('./UDPBroadcast');
require('./tcp').initialize(); // Instantiates and start TCP server

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
app.use('/api/video', require('./routes/video'));
app.use('/api/command', require('./routes/command'));
app.use('/api/disconnect', require('./routes/disconnect'));
app.use('/api/job', require('./routes/job'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('dist'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
  });
}
