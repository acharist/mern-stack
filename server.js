const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');

const config = require('./config/config');

//Require routing
const article = require('./routes/article');
const index = require('./routes/index');
const signup = require('./routes/signup');
const user = require('./routes/user');

//Set up mongodb
mongoose.connect(config.db('localhost', 27017, 'mernApp'), { useNewUrlParser: true });

mongoose.connection.on("open", () => {
    console.log("Connected to mongo server.");
});

mongoose.connection.on("error", (err) => {
    console.log("Could not connect to mongo server! " + err);
});

const app = express();

//Handle CORS requests
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        res.header('Access-Control-Request-Method', 'GET, POST, PUT, DELETE');
    }
    next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Routing 
app.use('/', index);
app.use('/signup', signup);
app.use('/user', user);
app.use('/article', article);

//Error handling
app.use((req, res, next) => {
    next(createError(404));
});

app.use((err, req, res, next) => {
    res.json({
        status: err.status,
        message: err.message
    })
});

app.listen(config.app.port, () => {
    console.log(`App running at port ${config.app.port}`);
});