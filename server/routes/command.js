const express = require('express');
const router = express.Router();
const tcp = require('../tcp').tcp();

// @route    POST api/command
// @desc     Send command to mach3
// @access   Public
router.post('/', (req, res) => {
  tcp.sendCommand(req.body, (result) => {
    res.end(result);
  });
});

module.exports = router;
