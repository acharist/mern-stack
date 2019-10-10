const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const createError = require('http-errors');
const queryProcessing = require('./middlewares/queryProcessing');
const path = require('path');
require('dotenv').config();

// Require routing
const signup = require('./routes/signup');
const signin = require('./routes/signin');
const refreshTokens = require('./routes/refreshTokens');
const user = require('./routes/user');

// Set up mongodb
mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_COLLECTION_NAME}`,
    { useNewUrlParser: true });

mongoose.connection.on("open", () => {
    console.log("Connected to mongo server.");
});

mongoose.connection.on("error", (err) => {
    console.log("Could not connect to mongo server! " + err);
});

const app = express();

// Handle CORS requests
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

// Allow methods
app.use(queryProcessing);

app.use('/api/uploads', express.static(path.join(__dirname, 'uploads')));

// Routing 
app.use('/api/auth/signup', signup);
app.use('/api/auth/signin', signin);
app.use('/api/auth/refresh-tokens', refreshTokens);
app.use('/api/user', user);

// Error handling
app.use((req, res, next) => {
    next(createError(404));
});

app.use((err, req, res, next) => {
    res.status(err.status).json({
        message: err.message
    });
});

app.listen(process.env.PORT, () => {
    console.log(`App running at port ${process.env.PORT}`);
});