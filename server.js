const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/config');

const app = express();

app.listen(config.app.port, () => {
    console.log(`App running at port ${config.app.port}`);
})