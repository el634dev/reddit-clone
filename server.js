require('dotenv').config();

const express = require("express");
const app = express();
const expbs = require("express-handlebars");
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

app.use(cookieParser());
const port = process.env.PORT;

// Setup 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set db
require('./data/reddit-db');

// Handlebars Engine Setup
const hbs = expbs.create({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, '/views/layouts'),
    partialsDir: path.join(__dirname,'/views/partials')
})

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
// app.set('views', './views');

// Middleware
const checkAuth = require('./middleware/checkAuth');
app.use(checkAuth);

// Controllers 
require('./controllers/posts')(app);
require('./controllers/comments.js')(app);
require('./controllers/auth.js')(app);

app.listen(port);

module.exports = app;