const { engine } = require("express-handlebars");

const express = require("express");
const app = express();

const dotenv = require('dotenv');
dotenv.config()
const port = process.env.PORT;

// Handlebar Engine Setup
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

app.get("/", (req, res) => {
    res.render("home")
})

app.listen(port);