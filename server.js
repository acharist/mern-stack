const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/config');

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

//Use routing
app.use('/', index);

app.listen(config.app.port, () => {
    console.log(`App running at port ${config.app.port}`);
});