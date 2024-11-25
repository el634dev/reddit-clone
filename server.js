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
<<<<<<< HEAD

// Set db
require('./data/reddit-db');

// Controllers 
require('./controllers/posts')(app);
=======
>>>>>>> f8d3c1b057d96ebfb276740e5cf4d5ae1e467830

// Set db
require('./data/reddit-db');

// Controllers 
require('./controllers/posts')(app);

app.listen(port);
