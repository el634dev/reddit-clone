/* Mongoose Connection */
const mongoose = require('mongoose');
const dotenv = require('dotenv');
assert = require('assert');

dotenv.config()
// DB URL
const url = process.env.CONNECTION_STRING;

// Connection Logic
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true}).catch((err) => {
  //callback code
  assert.equal(null, err);
  console.log('Connected successfully to database');
});


mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection Error:'));
mongoose.set('debug', true);

module.exports = mongoose.connection;
