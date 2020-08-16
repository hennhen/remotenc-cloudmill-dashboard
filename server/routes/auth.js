const express = require('express');
const router = express.Router();
const tcp = require('../tcp').tcp();
const ipSocketMap = require('../ipSocketMap');
const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');

// @route    GET api/auth
// @desc     Get user by token
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/auth
// @desc     Authenticate user & get token
// @access   Public
router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: '5 days' },
        (err, token) => {
          if (err) throw err;
          // TODO: Enter data object to function
          if (!config.dev.mach3) tcpConnect();
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

const tcpConnect = (data) => {
  const { targetIP, socketID } = data;
  tcp.sendAuthRequest(data, (result) => {
    //TODO: Directly get result's status code into the status code
    const JSONresult = JSON.parse(result);
    console.log(JSONresult);

    if (JSONresult.status == 200) {
      // Auth Success
      console.log('Login Sucess');
      console.log(targetIP, socketID);
      ipSocketMap[targetIP] = socketID;
    } else {
      // Auth Failure
      console.log('Login Failed. Incorrect Password');
    }
  });
};

module.exports = router;
