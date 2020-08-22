const config = require('config');
const path = require('path');
//============== Express Stuff =================
const express = require('express');
const app = express();
const connectDB = require('./db');

// Connect Database
connectDB();

const PORT = process.env.PORT || config.port;

const server = app.listen(PORT, () => {
  console.log('Express started on PORT: ', PORT);
});

require('./io').initialize(server);

// Init Middleware
app.use(express.json());
app.use(require('cors')());

// Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/rtc', require('./routes/rtc'));
app.use('/api/job', require('./routes/job'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('dist'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
  });
}
