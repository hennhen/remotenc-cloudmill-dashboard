const express = require('express');
const router = express.Router();
const tcp = require('../tcp').tcp();

router.post('/', (req, res) => {
  tcp.sendDisconnectRequest(req.body, (result) => {
    res.end(result);
  });
});

module.exports = router;
