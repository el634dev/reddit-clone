const { engine } = require("express-handlebars");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const express = require("express");
const app = express();
app.use(cookieParser());

require('dotenv').config();
const port = process.env.PORT;

// Setup 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set db
require('./data/reddit-db');

// Handlebars Engine Setup
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

// Controllers 
require('./controllers/posts')(app);
require('./controllers/comments.js')(app);
require('./controllers/auth.js')(app);

app.listen(port);

module.exports = app;