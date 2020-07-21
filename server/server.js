const config = require('config');
//============== Express Stuff =================
const path = require('path');
var express = require('express');
// const router = express.Router();
var app = express();

var httpServer = app.listen(
  config.express_server_port,
  config.local_ip || 'localhost',
  () => {
    console.log('Express started on PORT: ', config.express_server_port);
  }
);

//===============Redis==================
// const redis = require("redis");
// const _PORT_REDIS = config.port_redis;
// const redis_client = redis.createClient(_PORT_REDIS);

//============Dict==========
var ip_socket_map = {};

//===============Socekts (UDP/TCP)===============
const socketServer = require('socket.io')();
const UDPSOCKET = require('./UDPSocket');
// const UDPBroadcast = require('./UDPBroadcast');
const TCP = require('./TCPClient'); // Instantiates and start TCP server
var tcp = new TCP();

socketServer.listen(httpServer);

// Pass in the httpServer object to be reused for socket.io
// eslint-disable-next-line no-unused-vars
var udpSocket = new UDPSOCKET(httpServer, socketServer, ip_socket_map);

//=====================

app.use(express.json());
app.use(require('cors')());
app.use(express.static(path.join(__dirname, 'build')));

//================== EXPRESS ROUTES ===================
// app.get("/", function (req, res) {
//    res.sendFile(path.join(__dirname, "build", "index.html"));
//    console.log("serving file");
// });

// First route for handling weird formatting when coming from xhr
// TODO: Try to use Axios
app.use((req, res, next) => {
  // TODO: Make the condition better so not everything goes through here
  if (!req.body.target_ip || !req.body.target_port) {
    req.body.foreach((firstKey) => {
      console.log('Trying to parse weird json: ');
      console.log(firstKey);
      req.body = JSON.parse(firstKey);
    });
  }
  next();
});

// app.get('/discover', (req, res) => {
//   var socket_id = req.query.socket_id;
//   udpDiscover((machineData) => {
//     // TODO: If success then send back res: 200
//     socketServer.to(socket_id).emit('machine_data', machineData);
//   });
// });

app.post('/auth', (req, res) => {
  console.log(req.body);
  if (config.dev) return res.status(200).end('dev mode');
  tcp.sendAuthRequest(req.body, (result) => {
    //TODO: Directly get result's status code into the status code
    const JSONresult = JSON.parse(result);
    console.log(JSONresult);
    if (JSONresult.status == 200) {
      // Auth Success
      console.log('Login Sucess');
      console.log(req.body.target_ip, req.body.socket_id);
      ip_socket_map[req.body.target_ip] = req.body.socket_id;
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
