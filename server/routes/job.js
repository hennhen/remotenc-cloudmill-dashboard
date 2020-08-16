const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');

router.post(
  '/',
  [
    auth,
    [
      check('job', 'Job name is required').not().isEmpty(),
      check('gCode', 'GCode is required').not().isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { job, gCode } = req.body;

    console.log(req.user.id);

    try {
      let user = await User.findByIdAndUpdate(
        req.user.id,
        { job, gCode },
        { new: true }
      );
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
