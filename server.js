const { engine } = require("express-handlebars");

const express = require("express");
const app = express();

const dotenv = require('dotenv');
dotenv.config()
const port = process.env.PORT;

// Setup 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Handlebars Engine Setup
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

// Set db
require('./data/reddit-db');

// Controllers 
require('./controllers/posts')(app);

app.listen(port);