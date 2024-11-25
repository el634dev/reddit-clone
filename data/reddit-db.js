/* Mongoose Connection */
const mongoose = require('mongoose');
const dotenv = require('dotenv');
assert = require('assert');

dotenv.config()
const connection_string = process.env.CONNECTION_STRING;

// URl 
const url = connection_string;

// Connection Logic
mongoose.connect(
  url,
  {
    useNewUrlParser: true
  },
  function(err, db) {
    assert.equal(null, err);
    console.log('Connected successfully to database');

    // db.close(); turn on for testing
  }
);
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection Error:'));
mongoose.set('debug', true);

module.exports = mongoose.connection;