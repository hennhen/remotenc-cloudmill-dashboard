const express = require('express');
const router = express.Router();
const io = require('../io').io();

router.post('/', (req, res) => {
  const {
    body: { socketID, signal }
  } = req;

  io.to(socketID).emit('video', signal);
  res.status(200).end();
});

module.exports = router;
