const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/config');
const createError = require('http-errors');

//Require routing
const index = require('./routes/index');

//Set up mongodb
mongoose.connect(config.db('localhost', 27017, 'mernApp'), { useNewUrlParser: true });

mongoose.connection.on("open", () => {
    console.log("Connected to mongo server.");
});

mongoose.connection.on("error", (err) => {
    console.log("Could not connect to mongo server! " + err);
});

const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        res.header('Access-Control-Request-Method', 'GET, POST, PUT, DELETE');
    }
    next();
})

//Use routing
app.use('/', index);

//Error handling
app.use((req, res, next) => {
    next(createError(404));
})

app.use((err, req, res, next) => {
    res.json({
        status: err.status,
        message: err.message
    })
})

app.listen(config.app.port, () => {
    console.log(`App running at port ${config.app.port}`);
});