const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const createError = require('http-errors');
const queryProcessing = require('./middlewares/queryProcessing');
const checkAuth = require('./middlewares/checkAuth');
const path = require('path');

const config = require('./config/config');

//Require routing
const signup = require('./routes/signup');
const signin = require('./routes/signin');
const refreshToken = require('./routes/refreshToken');
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

//Allow methods
app.use(queryProcessing);

app.use('/api/uploads', checkAuth, express.static(path.join(__dirname, 'uploads')));

//Routing 
app.use('/api/auth/signup', signup);
app.use('/api/auth/signin', signin);
app.use('/api/auth/refresh-token', refreshToken);
app.use('/api/user', user);

//Error handling
app.use((req, res, next) => {
    next(createError(404));
});

app.use((err, req, res, next) => {
    res.status(err.status).json({
        message: err.message
    });
});

app.listen(config.app.port, () => {
    console.log(`App running at port ${config.app.port}`);
});