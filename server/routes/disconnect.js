const express = require('express');
const router = express.Router();
const tcp = require('../tcp').tcp();

// @route    POST api/disconnect
// @desc     Disconnect mach3
// @access   Public
router.post('/', (req, res) => {
  tcp.sendDisconnectRequest(req.body, (result) => {
    res.end(result);
  });
});

module.exports = router;
